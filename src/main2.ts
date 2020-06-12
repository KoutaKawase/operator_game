import { GameMainParameterObject, RPGAtsumaruWindow } from './parameterObject';

declare const window: RPGAtsumaruWindow;

export function main(param: GameMainParameterObject): void {
  const scene = new g.Scene({
    game: g.game,
  });
  let time = 60; // 制限時間
  if (param.sessionParameter.totalTimeLimit) {
    time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
  }
  g.game.vars.gameState = { score: 0 };
  scene.loaded.add(() => {
    const updateHandler = () => {
      if (time <= 0) {
        // RPGアツマール環境であればランキングを表示します
        if (param.isAtsumaru) {
          const boardId = 1;
          window.RPGAtsumaru.experimental.scoreboards
            .setRecord(boardId, g.game.vars.gameState.score)
            .then(function () {
              window.RPGAtsumaru.experimental.scoreboards.display(boardId);
            });
        }
        scene.update.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
      }
      // カウントダウン処理
      time -= 1 / g.game.fps;
    };
    scene.update.add(updateHandler);
  });
  g.game.pushScene(scene);
}
