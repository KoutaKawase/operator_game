type ProblemPoint = {
  leftX: number;
  leftY: number;
  rightX: number;
  rightY: number;
  equalX: number;
  equalY: number;
  calculatedX: number;
  calculatedY: number;
};

export function createGameUIBase(scene: g.Scene): g.Sprite {
  return new g.Sprite({
    scene,
    src: scene.assets['gameUI'],
  });
}

export function createTimeLabel(scene: g.Scene): g.Label {
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

export function getProblemLabel(
  scene: g.Scene,
  font: g.BitmapFont,
  text: string,
  x: number,
  y: number,
): g.Label {
  const label = new g.Label({
    scene,
    text,
    font,
    x,
    y,
    fontSize: font.size,
  });
  return label;
}

export function getProblemPoint(): ProblemPoint {
  const BASE_Y = 0;
  const leftX = 10;
  const leftY = BASE_Y;
  const rightX = 150;
  const rightY = BASE_Y;
  const equalX = 210;
  const equalY = BASE_Y - 2;
  const calculatedX = 245;
  const calculatedY = BASE_Y;
  return { leftX, leftY, rightX, rightY, equalX, equalY, calculatedX, calculatedY };
}

export function createShadow(scene: g.Scene): g.FilledRect {
  return new g.FilledRect({
    scene,
    width: g.game.width,
    height: g.game.width,
    cssColor: '#999999',
    opacity: 0.5,
  });
}

export function getFont(scene: g.Scene, assetsName: string): g.BitmapFont {
  const font = scene.assets[assetsName];
  const glyph = scene.assets[`${assetsName}_glyphs`] as g.AudioAsset;
  const glyphData = JSON.parse(glyph.data);

  const bmf = new g.BitmapFont({
    src: font,
    map: glyphData.map,
    defaultGlyphWidth: glyphData.width,
    defaultGlyphHeight: glyphData.height,
    missingGlyph: glyphData.missingGlyph,
  });

  return bmf;
}
