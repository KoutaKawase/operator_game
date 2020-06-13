import { SubScene } from './SubScene';
import type { SceneInfo } from './types/SceneInfo';

export class TitleSubScene extends SubScene {
  static readonly DISPLAY_TIME = 10000;

  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    (this.assets['titleBgm'] as g.AudioAsset).play();

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

    const zzz = new g.FrameSprite({
      scene: this,
      src: this.assets['zzz'] as g.ImageAsset,
      width: 100,
      height: 100,
      srcWidth: 100,
      srcHeight: 100,
      frames: [0, 1, 2],
      x: 240,
      y: 100,
      interval: 1000,
    });

    this.append(zzz);
    zzz.start();

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
      (this.assets['titleBgm'] as g.AudioAsset).stop();
      this.goNext();
    }, TitleSubScene.DISPLAY_TIME);
  }

  protected updateHandler(): void {
    //mock
  }
}
