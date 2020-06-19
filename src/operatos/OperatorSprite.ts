import { Operator } from '../Problem';
import { Answer } from '../Answer';
import { Score } from '../Score';
import { Problem } from '../Problem';

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

  constructor(spriteInfo: SpriteInfo, answer: Answer, score: Score, problem: Problem) {
    super(spriteInfo);
    this.answer = answer;
    this.currect = spriteInfo.scene.assets['currect'] as g.AudioAsset;
    this.fail = spriteInfo.scene.assets['fail'] as g.AudioAsset;
    this.score = score;
    this.problem = problem;
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
      this.answer.bonusCount();
      this.score.count();
      this.problem.reflesh();
    } else {
      this.fail.play();
      this.answer.resetBonus();
      this.score.deduct();
      this.problem.reflesh();
    }
  }
}
