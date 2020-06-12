import { SceneController } from './SceneController';
import { initGameState } from './utils/gameUtil';

export class MainSceneController extends SceneController {
  static createMainScene(game: g.Game): g.Scene {
    const controller = new this();
    return controller.createScene(game);
  }

  createScene(game: g.Game): g.Scene {
    initGameState();
    return new g.Scene({ game });
  }

  onLoaded(scene: g.Scene): boolean {
    scene;
    return true;
  }

  onUpdate(scene: g.Scene): boolean {
    scene;
    return false;
  }
}
