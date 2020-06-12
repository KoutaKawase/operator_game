import { GameMainParameterObject } from './parameterObject';
import { MainSceneController } from './MainSceneController';

export function main(param: GameMainParameterObject) {
  param;
  return MainSceneController.createMainScene(g.game);
}
