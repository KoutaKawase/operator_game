import { Operator } from '../Problem';
import { Answer } from '../Answer';

type SpriteInfo = {
  scene: g.Scene;
  src: g.Surface | g.Asset;
  x: number;
  y: number;
  touchable: boolean;
};

export abstract class OperatorSprite extends g.Sprite {
  protected abstract operator: Operator;
  protected answer: Answer;

  constructor(spriteInfo: SpriteInfo, answer: Answer) {
    super(spriteInfo);
    this.answer = answer;
  }

  public initHandler(): void {
    this.pointDown.add(() => {
      this.pointDownHandler();
    });
  }

  protected abstract pointDownHandler(): void;
}
