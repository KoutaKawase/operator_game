import { Operator } from '../Problem';
import { OPERATOR_WIDTH, MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { OpeInfo } from '../Choice';

export class Cross extends OperatorSprite {
  protected operator: Operator = '*';

  constructor({ scene, answer, score, problem }: OpeInfo) {
    super(
      {
        scene,
        src: scene.assets['cross'],
        x: OPERATOR_WIDTH * 2 + MARGIN_RIGHT,
        y: FIXED_Y,
        touchable: true,
      },
      answer,
      score,
      problem,
    );
  }
}
