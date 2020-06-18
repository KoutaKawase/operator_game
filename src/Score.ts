import { getFont } from './utils/entityUtil';

export class Score {
  private scoreLabel: { left: g.Label; right: g.Label };
  private scene: g.Scene;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.scoreLabel = {
      left: this.createScoreLeftLabel(),
      right: this.createScoreRightLabel(),
    };
  }

  show(): void {
    this.scene.append(this.scoreLabel.left);
    this.scene.append(this.scoreLabel.right);
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
