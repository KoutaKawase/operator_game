import type { SceneInfo } from './types/SceneInfo';
import { RPGAtsumaruWindow } from './types/parameterObject';

declare const window: RPGAtsumaruWindow;

export abstract class SubScene extends g.Scene {
  private requestedNestSubScene = new g.Trigger<void>();

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  init(nextSubScene?: SubScene): void {
    this.loaded.add(() => {
      this.setNextSubScene(nextSubScene);
      this.loadedHandler();
    });
  }

  goNext(): void {
    this.requestedNestSubScene.fire();
  }

  private setNextSubScene(nextSubScene?: SubScene) {
    this.requestedNestSubScene.add(() => {
      this.destroy();
      if (!nextSubScene) {
        return;
      }
      g.game.pushScene(nextSubScene);
    });
  }

  protected commonUpdateHandler(): void {
    const time = g.game.vars.gameState.totalTimeLimit;
    const { isAtsumaru, score } = g.game.vars.gameState;

    if (time <= 0) {
      if (isAtsumaru) {
        const boardId = 1;
        window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, score).then(() => {
          window.RPGAtsumaru.experimental.scoreboards.display(boardId);
        });
      }
      this.update.remove(this.updateHandler);
    }
    g.game.vars.gameState.totalTimeLimit -= 1 / g.game.fps;
  }

  protected abstract loadedHandler(): void;
  protected abstract updateHandler(): void;
}
