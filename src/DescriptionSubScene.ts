import type { SceneInfo } from './types/SceneInfo';
import { SubScene } from './SubScene';

export class DescriptionSubScene extends SubScene {
  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    const background = new g.FilledRect({
      scene: this,
      width: g.game.width,
      height: g.game.height,
      cssColor: '#000000',
      opacity: 0.8,
    });
    this.append(background);

    const descBack = new g.Sprite({
      scene: this,
      src: this.assets['descBack'],
      y: 50,
    });
    this.append(descBack);
  }

  protected updateHandler(): void {
    //mock
  }
}
