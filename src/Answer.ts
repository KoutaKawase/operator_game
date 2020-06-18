import { getFont } from './utils/entityUtil';
import { Operator } from './Problem';
import { Problem } from './Problem';

export class Answer {
  private currectAnswerCountLabel: { left: g.Label; right: g.Label };
  private problem: Problem;
  private scene: g.Scene;
  private currectCount: number;

  constructor(scene: g.Scene, problem: Problem) {
    this.scene = scene;
    this.currectAnswerCountLabel = {
      left: this.createLeftLabel(),
      right: this.createRightLabel(),
    };
    this.problem = problem;
    this.currectCount = 0;
  }

  show(): void {
    this.scene.append(this.currectAnswerCountLabel.left);
    this.scene.append(this.currectAnswerCountLabel.right);
  }

  count(): void {
    this.currectCount += 1;
    const count = this.currectCount.toString();
    this.currectAnswerCountLabel.right.text = count + '回';
    this.currectAnswerCountLabel.right.invalidate();
  }

  /**
   * ユーザーが選んだ答えと問題の答え合わせをする
   * @param operator ユーザーの選んだ演算子
   * @return {boolean} 正解したかどうかの真偽値
   */
  submit(operator: Operator): boolean {
    const isCorrect = this.problem.compareWith(operator);
    return isCorrect;
  }

  private createRightLabel(): g.Label {
    const scene = this.scene;
    const font = getFont(this.scene, 'answer');

    const rightLabel = new g.Label({
      scene,
      text: '0回',
      font,
      x: 570,
      y: 100,
      fontSize: font.size,
    });

    return rightLabel;
  }

  private createLeftLabel(): g.Label {
    const scene = this.scene;
    const font = getFont(this.scene, 'answer');

    const leftLabel = new g.Label({
      scene,
      text: '正解数',
      font,
      x: 390,
      y: 100,
      fontSize: font.size,
    });

    return leftLabel;
  }
}
