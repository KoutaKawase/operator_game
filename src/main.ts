import { GameMainParameterObject } from './types/parameterObject';
import { MainSceneController } from './MainSceneController';

export function main(param: GameMainParameterObject): void {
  param;
  g.game.pushScene(MainSceneController.createMainScene(g.game));
}
