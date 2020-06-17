import { GameMainParameterObject } from './types/parameterObject';
import { MainSceneController } from './MainSceneController';

export function main(param: GameMainParameterObject): void {
  g.game.pushScene(MainSceneController.createMainScene(g.game, param));
}
