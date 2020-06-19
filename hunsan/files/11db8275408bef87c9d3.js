"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = void 0;

function main(param) {
  var scene = new g.Scene({
    game: g.game
  });
  var time = 60; // 制限時間

  if (param.sessionParameter.totalTimeLimit) {
    time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
  }

  g.game.vars.gameState = {
    score: 0
  };
  scene.loaded.add(function () {
    var updateHandler = function updateHandler() {
      if (time <= 0) {
        // RPGアツマール環境であればランキングを表示します
        if (param.isAtsumaru) {
          var boardId_1 = 1;
          window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId_1, g.game.vars.gameState.score).then(function () {
            window.RPGAtsumaru.experimental.scoreboards.display(boardId_1);
          });
        }

        scene.update.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
      } // カウントダウン処理


      time -= 1 / g.game.fps;
    };

    scene.update.add(updateHandler);
  });
  g.game.pushScene(scene);
}

exports.main = main;