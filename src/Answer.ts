import { getFont } from './utils/entityUtil';
import { Operator } from './Problem';
import { Problem } from './Problem';

export class Answer {
  private currectAnswerCountLabel: { left: g.Label; right: g.Label };
  private bonusText: g.Label;
  private bonusPoint: g.Label;
  private problem: Problem;
  private scene: g.Scene;
  private currectCount: number;
  //連続正解カウント
  private continuousCount = 0;
  //連続正解時付与される追加ポイント
  private _bonus = 0;

  constructor(scene: g.Scene, problem: Problem) {
    this.scene = scene;
    this.currectAnswerCountLabel = {
      left: this.createLeftLabel(),
      right: this.createRightLabel(),
    };
    this.problem = problem;
    this.currectCount = 0;
    this.bonusText = this.createBonusTextLabel();
    this.bonusPoint = this.createBonusPointLabel();
  }

  show(): void {
    this.scene.append(this.currectAnswerCountLabel.left);
    this.scene.append(this.currectAnswerCountLabel.right);
    this.scene.append(this.bonusText);
    this.scene.append(this.bonusPoint);
  }

  count(): void {
    this.currectCount += 1;
    const count = this.currectCount.toString();
    this.currectAnswerCountLabel.right.text = count + '回';
    this.currectAnswerCountLabel.right.invalidate();
  }

  bonusCount(): void {
    this.continuousCount += 1;
    //連続正解二回目からボーナス付与させたいので
    if (this.continuousCount > 1) {
      //ボーナス計算に使うため
      const FIXED_BONUS = 250;
      this._bonus += FIXED_BONUS * this.continuousCount;
      const bonus = this._bonus.toString();
      this.bonusPoint.text = '+' + bonus;
      this.bonusPoint.invalidate();
    }
  }

  resetBonus(): void {
    this.continuousCount = 0;
    this.bonusPoint.text = '+0';
    this.bonusPoint.invalidate();
  }

  get bonus(): number {
    return this._bonus;
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

  private createBonusTextLabel(): g.Label {
    const scene = this.scene;
    const font = getFont(scene, 'bonus');
    const bonusText = new g.Label({
      scene,
      text: '連続正解ボーナス付与',
      font,
      x: 390,
      y: 135,
      fontSize: font.size,
    });
    return bonusText;
  }

  private createBonusPointLabel(): g.Label {
    const scene = this.scene;
    const font = getFont(scene, 'bonus');
    const bonusPoint = new g.Label({
      scene,
      text: '+0',
      font,
      x: 500,
      y: 165,
      fontSize: font.size,
    });
    return bonusPoint;
  }
}
