import { getFont } from './utils/entityUtil';

export class Score {
  private scoreLabel: { left: g.Label; right: g.Label };
  private scene: g.Scene;
  private point: number;
  static readonly FIXED_POINT = 2500;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.scoreLabel = {
      left: this.createScoreLeftLabel(),
      right: this.createScoreRightLabel(),
    };
    this.point = 0;
  }

  show(): void {
    this.scene.append(this.scoreLabel.left);
    this.scene.append(this.scoreLabel.right);
  }

  count(): void {
    this.point += Score.FIXED_POINT;
    g.game.vars.gameState.score = this.point;
    const point = this.point.toString();
    this.scoreLabel.right.x = 540;
    this.scoreLabel.right.text = point;
    this.scoreLabel.right.invalidate();
  }

  deduct(): void {
    if (this.point === 0) return;
    const deductPoint = 500;
    this.point -= deductPoint;
    g.game.vars.gameState.score = this.point;
    const point = this.point.toString();
    this.scoreLabel.right.text = point;
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
