import { Plus, Minus, Cross, Div } from './operatos';

export class Choice {
  private scene: g.Scene;
  private readonly plus: Plus;
  private readonly minus: Minus;
  private readonly cross: Cross;
  private readonly div: Div;
  //private operatos: [Plus, Minus, Cross. Div];
  static readonly marginRight = 24;
  static readonly spriteWidth = 80;
  static readonly y = 278;

  constructor(scene: g.Scene) {
    this.scene = scene;
    //this.plus = new g.Sprite({
    //  scene,
    //  src: scene.assets['plus'],
    //  x: Choice.marginRight,
    //  y: Choice.y,
    //  touchable: true
    //});
    this.plus = new Plus(this.scene);
    this.minus = new Minus(this.scene);
    this.cross = new Cross(this.scene);
    this.div = new Div(this.scene);
  }

  show(): void {
    this.scene.append(this.plus);
    this.scene.append(this.minus);
    this.scene.append(this.cross);
    this.scene.append(this.div);
  }

  initHandler(): void {
    this.plus.initHandler();
    this.minus.initHandler();
    this.cross.initHandler();
    this.div.initHandler();
  }
}
