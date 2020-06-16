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
