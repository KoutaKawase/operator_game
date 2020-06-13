import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';

export class GameSubScene extends SubScene {
  private isInGame: boolean;
  //カウントダウン音声のおおよその長さ この長さ分待ってからゲームを開始
  static readonly COUNTDOWN_TIME = 4500;

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
    this.isInGame = false;
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
    await this.runReadySound();
    console.log(this.isInGame);
  }

  protected updateHandler(): void {
    //mock
  }
}
