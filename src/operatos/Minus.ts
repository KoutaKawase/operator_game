import { Operator } from '../Problem';
import { OPERATOR_WIDTH, MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { OpeInfo } from '../Choice';

export class Minus extends OperatorSprite {
  protected operator: Operator = '-';

  constructor({ scene, answer, score, problem, fc }: OpeInfo) {
    super(
      {
        scene,
        src: scene.assets['minus'],
        x: OPERATOR_WIDTH + MARGIN_RIGHT,
        y: FIXED_Y,
        touchable: true,
      },
      answer,
      score,
      problem,
      fc,
    );
  }
}
