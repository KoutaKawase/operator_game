import type { SceneInfo } from './types/SceneInfo';

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

  protected abstract loadedHandler(): void;
  protected abstract updateHandler(): void;
}
