import { Operator } from '../Problem';

type SpriteInfo = {
  scene: g.Scene;
  src: g.Surface | g.Asset;
  x: number;
  y: number;
  touchable: boolean;
};

export abstract class OperatorSprite extends g.Sprite {
  protected abstract operator: Operator;

  constructor(spriteInfo: SpriteInfo) {
    super(spriteInfo);
  }

  public initHandler(): void {
    this.pointDown.add(() => {
      this.pointDownHandler();
    });
  }

  protected abstract pointDownHandler(): void;
}
