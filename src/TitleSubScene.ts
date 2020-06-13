import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';

export class TitleSubScene extends SubScene {
  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    this.setTimeout(() => {
      this.goNext();
    }, 2000);
  }

  protected updateHandler(): void {
    //mock
  }
}
