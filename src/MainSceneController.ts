import { initGameState } from './utils/gameUtil';
import { titleAssets, descriptionAsset, gameAsset } from './AssetInfos';
import { TitleSubScene } from './TitleSubScene';
import { DescriptionSubScene } from './DescriptionSubScene';
import { GameSubScene } from './GameSubScene';

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
    const descriptionSubScene = new DescriptionSubScene({
      game: g.game,
      assetIds: descriptionAsset,
    });
    const gameSubScene = new GameSubScene({ game: g.game, assetIds: gameAsset });
    console.log(scene);

    titleSubScene.init(descriptionSubScene);
    descriptionSubScene.init(gameSubScene);
    gameSubScene.init();

    g.game.pushScene(titleSubScene);
  }
}
