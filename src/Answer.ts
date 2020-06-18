import { getAnswerFont } from './utils/entityUtil';
import { Operator } from './Problem';
import { Problem } from './Problem';

export class Answer {
  private correctAnswerCountLabel: { left: g.Label; right: g.Label };
  private problem: Problem;
  private scene: g.Scene;

  constructor(scene: g.Scene, problem: Problem) {
    this.scene = scene;
    this.correctAnswerCountLabel = {
      left: this.createLeftLabel(),
      right: this.createRightLabel(),
    };
    this.problem = problem;
  }

  show(): void {
    this.scene.append(this.correctAnswerCountLabel.left);
    this.scene.append(this.correctAnswerCountLabel.right);
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
    const font = getAnswerFont(this.scene);

    const rightLabel = new g.Label({
      scene,
      text: '0回',
      font,
      x: 580,
      y: 100,
      fontSize: font.size,
    });

    return rightLabel;
  }

  private createLeftLabel(): g.Label {
    const scene = this.scene;
    const font = getAnswerFont(this.scene);

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
