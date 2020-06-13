import type { SceneInfo } from './types/SceneInfo';

export class SubScene extends g.Scene {
  private requestedNestSubScene = new g.Trigger<void>();

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  init(nextSubScene?: SubScene): void {
    this.loaded.add(() => {
      this.setNextSubScene(nextSubScene);

      this.setTimeout(() => {
        this.goNext();
      }, 5000);
    });
  }

  goNext(): void {
    this.requestedNestSubScene.fire();
  }

  private setNextSubScene(nextSubScene?: SubScene) {
    this.requestedNestSubScene.add(() => {
      console.log('Trigger FIRED!!');
      console.log(nextSubScene);
    });
  }
}
