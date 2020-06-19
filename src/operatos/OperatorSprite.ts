import { Operator } from '../Problem';
import { Answer } from '../Answer';
import { Score } from '../Score';
import { Problem } from '../Problem';
import { FoxComment } from '../FoxComment';

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
  protected problem: Problem;
  protected foxComment: FoxComment;

  constructor(
    spriteInfo: SpriteInfo,
    answer: Answer,
    score: Score,
    problem: Problem,
    fc: FoxComment,
  ) {
    super(spriteInfo);
    this.answer = answer;
    this.currect = spriteInfo.scene.assets['currect'] as g.AudioAsset;
    this.fail = spriteInfo.scene.assets['fail'] as g.AudioAsset;
    this.score = score;
    this.problem = problem;
    this.foxComment = fc;
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
      this.foxComment.flashCurrect(this.scene);
      this.answer.count();
      this.answer.bonusCount();
      this.score.count();
      this.problem.reflesh();
    } else {
      this.fail.play();
      this.foxComment.flashFail(this.scene);
      this.answer.resetBonus();
      this.score.deduct();
      this.problem.reflesh();
    }
  }
}
