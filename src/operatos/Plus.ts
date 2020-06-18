import { Operator } from '../Problem';
import { MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { OpeInfo } from '../Choice';

export class Plus extends OperatorSprite {
  protected operator: Operator = '+';

  constructor({ scene, answer, score, problem }: OpeInfo) {
    super(
      {
        scene,
        src: scene.assets['plus'],
        x: MARGIN_RIGHT,
        y: FIXED_Y,
        touchable: true,
      },
      answer,
      score,
      problem,
    );
  }
}