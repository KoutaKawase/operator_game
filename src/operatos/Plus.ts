import { Operator } from '../Problem';
import { MARGIN_RIGHT, FIXED_Y } from './Constants';
import { OperatorSprite } from './OperatorSprite';
import { Answer } from '../Answer';
import { Score } from '../Score';

export class Plus extends OperatorSprite {
  protected operator: Operator = '+';

  constructor(scene: g.Scene, answer: Answer, score: Score) {
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
    );
  }
}
