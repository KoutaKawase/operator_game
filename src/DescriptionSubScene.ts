import type { SceneInfo } from './types/SceneInfo';
import { SubScene } from './SubScene';

export class DescriptionSubScene extends SubScene {
  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    console.log('Hello from description!');
  }

  protected updateHandler(): void {
    //mock
  }
}