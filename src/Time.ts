export class Time {
  private timeLabel: g.Label;
  private scene: g.Scene;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.timeLabel = this.createTimeLabel();
  }

  public show(): void {
    this.scene.append(this.timeLabel);
  }

  private createTimeLabel(): g.Label {
    const scene = this.scene;
    const timeFont = scene.assets['time_num'];
    const timeGlyph = scene.assets['time_num_glyphs'] as g.TextAsset;
    const glyphData = JSON.parse(timeGlyph.data);

    const font = new g.BitmapFont({
      src: timeFont,
      map: glyphData.map,
      defaultGlyphWidth: glyphData.width,
      defaultGlyphHeight: glyphData.height,
      missingGlyph: glyphData.missingGlyph,
    });

    const timeLabel = new g.Label({
      scene,
      text: '120',
      font,
      x: 450,
      y: 32,
      fontSize: font.size,
    });

    return timeLabel;
  }
}
