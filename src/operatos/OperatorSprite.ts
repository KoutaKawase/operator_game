import { Operator } from '../Problem';
import { Answer } from '../Answer';
import { Score } from '../Score';

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
  protected score: Score;
  protected currect: g.AudioAsset;
  protected fail: g.AudioAsset;

  constructor(spriteInfo: SpriteInfo, answer: Answer, score: Score) {
    super(spriteInfo);
    this.answer = answer;
    this.currect = spriteInfo.scene.assets['currect'] as g.AudioAsset;
    this.fail = spriteInfo.scene.assets['fail'] as g.AudioAsset;
    this.score = score;
  }

  public initHandler(): void {
    this.pointDown.add(() => {
      this.pointDownHandler();
    });
  }

  private pointDownHandler(): void {
    const isCorrect = this.answer.submit(this.operator);
    if (isCorrect) {
      this.currect.play();
      this.answer.count();
      this.score.count();
    } else {
      this.fail.play();
    }
  }
}
