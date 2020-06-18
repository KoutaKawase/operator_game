export class Time {
  private timeLabel: g.Label;
  private scene: g.Scene;
  //プレイするゲームそのものの制限時間
  private gameTime = 2;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.timeLabel = this.createTimeLabel();
  }

  show(): void {
    this.scene.append(this.timeLabel);
  }

  count(): void {
    this.gameTime -= 1 / g.game.fps;
  }

  update(): void {
    this.timeLabel.text = Math.trunc(this.gameTime).toString();
    this.timeLabel.invalidate();
  }

  now(): number {
    return this.gameTime;
  }

  isFinished(): boolean {
    return this.gameTime <= 0;
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
      text: this.gameTime.toString(),
      font,
      x: 450,
      y: 32,
      fontSize: font.size,
    });

    return timeLabel;
  }
}
