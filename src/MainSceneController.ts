import { initGameState } from './utils/gameUtil';
import { titleAssets } from './AssetInfos';
import { TitleSubScene } from './TitleSubScene';

export class MainSceneController {
  static createMainScene(game: g.Game): g.Scene {
    const controller = new this();
    return controller.createScene(game);
  }

  createScene(game: g.Game): g.Scene {
    initGameState();
    const scene = new g.Scene({ game });

    scene.loaded.add(() => {
      this.onLoaded(scene);
    });
    return scene;
  }

  private onLoaded(scene: g.Scene): void {
    const titleSubScene = new TitleSubScene({ game: g.game, assetIds: titleAssets });
    console.log(titleSubScene);
    console.log(scene);
  }
}
