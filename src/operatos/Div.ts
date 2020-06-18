import { Operator } from '../Problem';
import { OPERATOR_WIDTH, MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { Answer } from '../Answer';
import { Score } from '../Score';

export class Div extends OperatorSprite {
  protected operator: Operator = '/';

  constructor(scene: g.Scene, answer: Answer, score: Score) {
    super(
      {
        scene,
        src: scene.assets['div'],
        x: OPERATOR_WIDTH * 3 + MARGIN_RIGHT,
        y: FIXED_Y,
        touchable: true,
      },
      answer,
      score,
    );
  }
}
