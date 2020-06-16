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
    const rightFont = scene.assets['score_num'];
    const rightGlyph = scene.assets['score_num_glyphs'] as g.TextAsset;
    const glyphData = JSON.parse(rightGlyph.data);

    const font = new g.BitmapFont({
      src: rightFont,
      map: glyphData.map,
      defaultGlyphWidth: glyphData.width,
      defaultGlyphHeight: glyphData.height,
      missingGlyph: glyphData.missingGlyph,
    });

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
    const leftFont = scene.assets['score'];
    const leftGlyph = scene.assets['score_glyphs'] as g.TextAsset;
    const glyphData = JSON.parse(leftGlyph.data);

    const font = new g.BitmapFont({
      src: leftFont,
      map: glyphData.map,
      defaultGlyphWidth: glyphData.width,
      defaultGlyphHeight: glyphData.height,
      missingGlyph: glyphData.missingGlyph,
    });

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
