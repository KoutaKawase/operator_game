import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';

export class TitleSubScene extends SubScene {
  static readonly DISPLAY_TIME = 10000;

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    const background = new g.FilledRect({
      scene: this,
      width: g.game.width,
      height: g.game.height,
      opacity: 0.2,
      cssColor: '#FFCC66',
    });

    this.append(background);

    const title = new g.Sprite({
      scene: this,
      src: this.assets['titleImage'],
      x: g.game.width / 2,
      y: g.game.height / 2,
    });
    this.append(title);

    this.setTimeout(() => {
      this.goNext();
    }, TitleSubScene.DISPLAY_TIME);
  }

  protected updateHandler(): void {
    //mock
  }
}
