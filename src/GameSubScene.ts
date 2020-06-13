import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';

export class GameSubScene extends SubScene {
  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    //mock
    console.log('MAIN GAME');
  }

  protected updateHandler(): void {
    //mock
  }
}
