import { GameMainParameterObject, RPGAtsumaruWindow } from './parameterObject';

declare const window: RPGAtsumaruWindow;

export function main(param: GameMainParameterObject) {
  const scene = new g.Scene({
    game: g.game,
  });

  scene.loaded.add(() => {
    console.log(param);
    const rect = new g.FilledRect({
      scene,
      width: 50,
      height: 50,
      cssColor: 'red',
    });

    scene.append(rect);
  });

  g.game.pushScene(scene);
}
