import { Plus, Minus, Cross, Div } from './operatos';

export class Choice {
  private scene: g.Scene;
  private readonly operators: [Plus, Minus, Cross, Div];
  //private operatos: [Plus, Minus, Cross. Div];
  static readonly marginRight = 24;
  static readonly spriteWidth = 80;
  static readonly y = 278;

  constructor(scene: g.Scene) {
    this.scene = scene;
    const plus = new Plus(this.scene);
    const minus = new Minus(this.scene);
    const cross = new Cross(this.scene);
    const div = new Div(this.scene);
    this.operators = [plus, minus, cross, div];
  }

  show(): void {
    this.operators.forEach((o) => {
      this.scene.append(o);
    });
  }

  initHandler(): void {
    this.operators.forEach((o) => {
      o.initHandler();
    });
  }
}
