import { Operator } from '../Problem';
import { MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { Answer } from '../Answer';

export class Plus extends OperatorSprite {
  protected operator: Operator = '+';

  constructor(scene: g.Scene, answer: Answer) {
    super(
      {
        scene,
        src: scene.assets['plus'],
        x: MARGIN_RIGHT,
        y: FIXED_Y,
        touchable: true,
      },
      answer,
    );
  }

  protected pointDownHandler(): void {
    console.log(this.answer.submit(this.operator));
  }
}
