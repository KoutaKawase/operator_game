export type GameStateType = {
  score: number;
  isFinished: boolean;
};

export function initGameState() {
  const gameState: GameStateType = {
    score: 0,
    isFinished: false,
  };
  g.game.vars.gameState = gameState;
}
