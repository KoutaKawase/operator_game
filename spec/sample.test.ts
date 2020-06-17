// NOTE: スクリプトアセットとして実行される環境をエミュレーションするためにglobal.gを生成する
import g from '@akashic/akashic-engine';

describe('GameScene', () => {
  it('example', () => {
    expect(g).not.toBeUndefined();
  });
});
