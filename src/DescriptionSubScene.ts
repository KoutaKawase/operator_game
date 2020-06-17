import type { SceneInfo } from './types/SceneInfo';
import { SubScene } from './SubScene';
import { Label } from '@akashic-extension/akashic-label';

export class DescriptionSubScene extends SubScene {
  constructor(sceneInfo: SceneInfo) {
    super(sceneInfo);
  }

  protected loadedHandler(): void {
    this.update.add(this.updateHandler);
    const background = new g.FilledRect({
      scene: this,
      width: g.game.width,
      height: g.game.height,
      cssColor: '#000000',
      opacity: 0.8,
    });
    this.append(background);

    const descBack = new g.Sprite({
      scene: this,
      src: this.assets['descBack'],
      y: 50,
      x: 170,
    });
    this.append(descBack);

    const descFont = this.assets['description'];
    const descGlyph = this.assets['description_glyphs'] as g.TextAsset;
    const glyphData = JSON.parse(descGlyph.data);

    const font = new g.BitmapFont({
      src: descFont,
      map: glyphData.map,
      defaultGlyphWidth: glyphData.width,
      defaultGlyphHeight: glyphData.height,
      missingGlyph: glyphData.missingGlyph,
    });

    const desc = new Label({
      scene: this,
      text: '右辺の答えに合うような\r演算子を選ぼう！',
      font,
      fontSize: font.size,
      y: 120,
      lineGap: 10,
      width: g.game.width,
      textAlign: g.TextAlign.Center,
    });

    this.append(desc);

    this.setTimeout(() => {
      this.goNext();
    }, 1000);
  }

  protected updateHandler(): void {
    super.commonUpdateHandler();
  }
}
