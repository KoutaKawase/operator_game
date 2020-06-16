import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';
import { createGameUIBase } from './utils/entityUtil';
import { Time } from './Time';
import { Score } from './Score';
import { Answer } from './Answer';
import { Choice } from './Choice';

export class GameSubScene extends SubScene {
  private isInGame: boolean;
  private gameTime: Time | null;
  private score: Score | null;
  private answer: Answer | null;
  private choice: Choice | null;
  //カウントダウン音声のおおよその長さ この長さ分待ってからゲームを開始
  static readonly COUNTDOWN_TIME = 4500;

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
    this.isInGame = false;
    this.gameTime = null;
    this.score = null;
    this.answer = null;
    this.choice = null;
  }

  private runReadySound(): Promise<void> {
    (this.assets['countdown'] as g.AudioAsset).play();

    //play()だけだとすぐ次の処理にいってしまうのでサウンド分待って次にいくためsetTimeoutをしている
    return new Promise((resolve) => {
      this.setTimeout(() => {
        this.isInGame = true;
        resolve();
      }, GameSubScene.COUNTDOWN_TIME);
    });
  }

  protected async loadedHandler(): Promise<void> {
    const gameUIBase = createGameUIBase(this);
    this.append(gameUIBase);
    this.gameTime = new Time(this);
    this.gameTime.show();
    this.score = new Score(this);
    this.score.show();
    this.answer = new Answer(this);
    this.answer.show();
    this.choice = new Choice(this);
    this.choice.show();

    await this.runReadySound();
    console.log(this.isInGame);
  }

  protected updateHandler(): void {
    //mock
  }
}
