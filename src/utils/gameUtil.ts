import { GameMainParameterObject as Param } from '../types/parameterObject';

export type GameStateType = {
  score: number;
  isFinished: boolean;
  totalTimeLimit: number;
};

export function initGameState(param: Param): void {
  let totalTimeLimit = 150;

  if (param.sessionParameter.totalTimeLimit) {
    totalTimeLimit = param.sessionParameter.totalTimeLimit;
  }

  const gameState: GameStateType = {
    score: 0,
    isFinished: false,
    totalTimeLimit,
  };

  g.game.vars.gameState = gameState;
}
