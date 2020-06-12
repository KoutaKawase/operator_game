import { GameMainParameterObject } from './types/parameterObject';
import { MainSceneController } from './MainSceneController';

export function main(param: GameMainParameterObject) {
  param;
  return MainSceneController.createMainScene(g.game);
}
