import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';
import { createGameUIBase, createShadow } from './utils/entityUtil';
import { Time } from './Time';
import { Score } from './Score';
import { Answer } from './Answer';
import { Choice } from './Choice';
import { Problem } from './Problem';
import { FoxComment } from './FoxComment';

export class GameSubScene extends SubScene {
  private isInGame = false;
  private gameTime: Time | null;
  private score: Score | null;
  private answer: Answer | null;
  private choice: Choice | null;
  private problem: Problem | null;
  //カウントダウン音声のおおよその長さ この長さ分待ってからゲームを開始
  static readonly COUNTDOWN_TIME = 4500;

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
    this.gameTime = null;
    this.score = null;
    this.answer = null;
    this.choice = null;
    this.problem = null;
  }

  private runReadySound(shadow: g.FilledRect): Promise<void> {
    (this.assets['countdown'] as g.AudioAsset).play();

    //play()だけだとすぐ次の処理にいってしまうのでサウンド分待って次にいくためsetTimeoutをしている
    return new Promise((resolve) => {
      this.setTimeout(() => {
        this.isInGame = true;
        this.remove(shadow);
        resolve();
      }, GameSubScene.COUNTDOWN_TIME);
    });
  }

  protected async loadedHandler(): Promise<void> {
    const gameUIBase = createGameUIBase(this);
    //開始前にゲーム全体を覆う灰色のRect
    const shadow = createShadow(this);
    this.append(gameUIBase);
    this.problem = new Problem(this);
    this.problem.show();
    this.gameTime = new Time(this);
    this.gameTime.show();
    this.answer = new Answer(this, this.problem);
    this.answer.show();
    this.score = new Score(this, this.answer);
    this.score.show();
    const foxComment = new FoxComment(this);
    this.choice = new Choice(this, this.answer, this.score, this.problem, foxComment);
    this.choice.show();
    this.append(shadow);

    this.update.add(super.commonUpdateHandler, this);
    this.update.add(this.updateHandler, this);

    await this.runReadySound(shadow);
    this.choice.initHandler();
  }

  protected updateHandler(): void {
    if (this.isInGame && !this.gameTime?.isFinished()) {
      this.gameTime?.count();
      this.gameTime?.update();
    }

    if (this.gameTime?.isFinished()) {
      (this.assets['finish'] as g.AudioAsset).play();
      this.choice?.blockTouch();
      this.update.remove(this.updateHandler, this);
    }
  }
}
