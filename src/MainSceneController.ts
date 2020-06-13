import { initGameState } from './utils/gameUtil';
import { titleAssets, descriptionAsset } from './AssetInfos';
import { TitleSubScene } from './TitleSubScene';
import { DescriptionSubScene } from './DescriptionSubScene';

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
    const descriptionScene = new DescriptionSubScene({ game: g.game, assetIds: descriptionAsset });
    console.log(scene);
    titleSubScene.init(descriptionScene);

    g.game.pushScene(titleSubScene);
  }
}
