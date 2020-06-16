export class Score {
  private scoreLabel: g.Label;
  private scene: g.Scene;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.scoreLabel = this.createScoreLabel();
  }

  show(): void {
    this.scene.append(this.scoreLabel);
  }

  private createScoreLabel(): g.Label {
    const scene = this.scene;
    const scoreFont = scene.assets['score'];
    const scoreGlyph = scene.assets['score_glyphs'] as g.TextAsset;
    const glyphData = JSON.parse(scoreGlyph.data);

    const font = new g.BitmapFont({
      src: scoreFont,
      map: glyphData.map,
      defaultGlyphWidth: glyphData.width,
      defaultGlyphHeight: glyphData.height,
      missingGlyph: glyphData.missingGlyph,
    });

    const scoreLabel = new g.Label({
      scene,
      text: 'SCORE:',
      font,
      x: 390,
      y: 70,
      fontSize: font.size,
    });

    return scoreLabel;
  }
}
