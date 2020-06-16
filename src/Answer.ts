export class Answer {
  private correctAnswerCountLabel: { left: g.Label; right: g.Label };
  private scene: g.Scene;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.correctAnswerCountLabel = {
      left: this.createLeftLabel(),
      right: this.createRightLabel(),
    };
  }

  show(): void {
    this.scene.append(this.correctAnswerCountLabel.left);
    this.scene.append(this.correctAnswerCountLabel.right);
  }

  private createRightLabel(): g.Label {
    const scene = this.scene;
    const rightFont = scene.assets['answer'];
    const rightGlyph = scene.assets['answer_glyphs'] as g.TextAsset;
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
    const leftFont = scene.assets['answer'];
    const leftGlyph = scene.assets['answer_glyphs'] as g.TextAsset;
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
      text: '正解数',
      font,
      x: 390,
      y: 100,
      fontSize: font.size,
    });

    return leftLabel;
  }
}
