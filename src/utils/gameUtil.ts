import { GameMainParameterObject as Param } from '../types/parameterObject';

export type GameStateType = {
  score: number;
  //isFinished: boolean;
  totalTimeLimit: number;
  isAtsumaru: boolean;
};

export function initGameState(param: Param): void {
  let totalTimeLimit = 95;

  if (param.sessionParameter.totalTimeLimit) {
    totalTimeLimit = param.sessionParameter.totalTimeLimit;
  }

  const gameState: GameStateType = {
    score: 0,
    totalTimeLimit,
    isAtsumaru: param.isAtsumaru,
  };

  g.game.vars.gameState = gameState;
}
