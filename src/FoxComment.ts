import { getFont } from './utils/entityUtil';
import { Label } from '@akashic-extension/akashic-label';

export class FoxComment extends Label {
  static readonly x = 400;
  static readonly y = 230;
  static readonly comments = {
    currect: ['やりますねえ！', 'ヌッ'],
    fail: ['頭に来ますよ', 'あっおい待てィ\r(江戸っ子)'],
  };
  static readonly REMOVE_TIME = 500;

  constructor(scene: g.Scene) {
    const font = getFont(scene, 'comment');
    super({
      scene,
      text: '',
      font,
      fontSize: font.size,
      x: FoxComment.x,
      y: FoxComment.y,
      width: g.game.width,
    });
  }

  flashCurrect(scene: g.Scene): void {
    const comment = this.getComment('currect');
    this.text = comment;
    this.x = this.adjustPoint(comment);
    this.invalidate();
    scene.append(this);
    scene.setTimeout(() => {
      //ヌッの時X座標が変更されてるので戻しておく
      this.x = FoxComment.x;
      this.invalidate();
      scene.remove(this);
    }, FoxComment.REMOVE_TIME);
  }

  flashFail(scene: g.Scene): void {
    const comment = this.getComment('fail');
    this.text = comment;
    this.x = this.adjustPoint(comment);
    this.invalidate();
    scene.append(this);
    scene.setTimeout(() => {
      scene.remove(this);
    }, FoxComment.REMOVE_TIME);
  }

  private getComment(state: 'currect' | 'fail'): string {
    const commentState = state === 'currect' ? state : 'fail';
    const random = g.game.random.generate();
    const comments = FoxComment.comments[commentState];
    const comment = comments[Math.floor(random * comments.length)];
    return comment;
  }

  //出てきたセリフに合わせて調整されたx座標を出力する
  private adjustPoint(comment: string): number {
    switch (comment) {
      case 'ヌッ':
        return this.x + 30;
      default:
        return this.x;
    }
  }
}
