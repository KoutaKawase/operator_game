import { initGameState } from './utils/gameUtil';

export class MainSceneController {
  static createMainScene(game: g.Game): g.Scene {
    const controller = new this();
    return controller.createScene(game);
  }

  createScene(game: g.Game): g.Scene {
    initGameState();
    const assetIds: string[] = [];
    //ここらへんでアセット全部よみこむ
    const scene = new g.Scene({ game, assetIds });

    scene.loaded.add(() => {
      this.onLoaded(scene);
    });
    return scene;
  }

  private onLoaded(scene: g.Scene): void {
    scene;
  }
}
