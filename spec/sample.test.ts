// NOTE: スクリプトアセットとして実行される環境をエミュレーションするためにglobal.gを生成する
import g from '@akashic/akashic-engine';

describe("mainScene", () => {
	beforeEach(() => {
	});

	afterEach(() => {
	});

	it("example", () => {
		expect(g).not.toBeUndefined();
	});
});
