import { Operator } from '../Problem';
import { MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';

export class Plus extends OperatorSprite {
  protected operator: Operator = '+';

  constructor(scene: g.Scene) {
    super({
      scene,
      src: scene.assets['plus'],
      x: MARGIN_RIGHT,
      y: FIXED_Y,
      touchable: true,
    });
  }

  protected pointDownHandler(): void {
    console.log(this.operator);
  }
}
