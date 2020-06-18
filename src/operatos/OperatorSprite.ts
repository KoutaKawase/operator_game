import { Operator } from '../Problem';
import { Answer } from '../Answer';

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
  protected currect: g.AudioAsset;
  protected fail: g.AudioAsset;

  constructor(spriteInfo: SpriteInfo, answer: Answer) {
    super(spriteInfo);
    this.answer = answer;
    this.currect = spriteInfo.scene.assets['currect'] as g.AudioAsset;
    this.fail = spriteInfo.scene.assets['fail'] as g.AudioAsset;
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
    } else {
      this.fail.play();
    }
  }
}
