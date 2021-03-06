import { getFont } from './utils/entityUtil';
import { Answer } from './Answer';

export class Score {
  private scoreLabel: { left: g.Label; right: g.Label };
  private scene: g.Scene;
  private point: number;
  private readonly answer: Answer;
  static readonly FIXED_POINT = 300;

  constructor(scene: g.Scene, answer: Answer) {
    this.scene = scene;
    this.scoreLabel = {
      left: this.createScoreLeftLabel(),
      right: this.createScoreRightLabel(),
    };
    this.point = 0;
    this.answer = answer;
  }

  show(): void {
    this.scene.append(this.scoreLabel.left);
    this.scene.append(this.scoreLabel.right);
  }

  count(): void {
    const bonus = this.answer.bonus;
    this.point += Score.FIXED_POINT + bonus;
    g.game.vars.gameState.score = this.point;
    this.updateRightLabel(540);
  }

  deduct(): void {
    if (this.point === 0) return;
    const deductPoint = 200;
    this.point -= deductPoint;
    g.game.vars.gameState.score = this.point;
    this.updateRightLabel();
  }

  private updateRightLabel(x?: number): void {
    const pointStr = this.point.toString();
    if (x != null) {
      this.scoreLabel.right.x = x;
    }
    this.scoreLabel.right.text = pointStr;
    this.scoreLabel.right.invalidate();
  }

  private createScoreRightLabel(): g.Label {
    const scene = this.scene;
    const font = getFont(this.scene, 'score_num');

    const rightLabel = new g.Label({
      scene,
      text: '0',
      font,
      x: 600,
      y: 70,
      fontSize: font.size,
    });

    return rightLabel;
  }

  private createScoreLeftLabel(): g.Label {
    const scene = this.scene;
    const font = getFont(this.scene, 'score');

    const leftLabel = new g.Label({
      scene,
      text: 'SCORE:',
      font,
      x: 390,
      y: 70,
      fontSize: font.size,
    });

    return leftLabel;
  }
}
