import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';

export class TitleSubScene extends SubScene {
  static readonly DISPLAY_TIME = 10000;

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    const background = new g.FilledRect({
      scene: this,
      width: g.game.width,
      height: g.game.height,
      opacity: 0.2,
      cssColor: '#FFCC66',
    });
    this.append(background);

    const fox = new g.Sprite({
      scene: this,
      src: this.assets['titleImage'],
      x: g.game.width / 2,
      y: g.game.height / 2,
    });
    this.append(fox);

    const tokimakureFont = this.assets['tokimakure'];
    const tokimakureGlyph = this.assets['tokimakure_glyphs'] as g.TextAsset;
    const glyphData = JSON.parse(tokimakureGlyph.data);

    const font = new g.BitmapFont({
      src: tokimakureFont,
      map: glyphData.map,
      defaultGlyphWidth: glyphData.width,
      defaultGlyphHeight: glyphData.height,
      missingGlyph: glyphData.missingGlyph,
    });

    const titleTop = new g.Label({
      scene: this,
      text: '解きまくれ！',
      fontSize: font.size,
      font,
      y: 35,
    });

    const titleBottom = new g.Label({
      scene: this,
      text: 'エキノコックスくん！',
      fontSize: font.size,
      font,
      y: titleTop.y * 2 + 10,
    });

    titleTop.x = (g.game.width - titleTop.width) / 2;
    titleBottom.x = (g.game.width - titleBottom.width) / 2;
    titleTop.modified();
    titleBottom.modified();

    this.append(titleTop);
    this.append(titleBottom);

    this.setTimeout(() => {
      this.goNext();
    }, TitleSubScene.DISPLAY_TIME);
  }

  protected updateHandler(): void {
    //mock
  }
}
