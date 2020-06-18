import { Operator } from '../Problem';
import { OPERATOR_WIDTH, MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { Answer } from '../Answer';

export class Minus extends OperatorSprite {
  protected operator: Operator = '-';

  constructor(scene: g.Scene, answer: Answer) {
    super(
      {
        scene,
        src: scene.assets['minus'],
        x: OPERATOR_WIDTH + MARGIN_RIGHT,
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
