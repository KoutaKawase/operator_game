import { Plus, Minus, Cross, Div } from './operatos';
import { Answer } from './Answer';
import { Score } from './Score';

export class Choice {
  private scene: g.Scene;
  private readonly operators: [Plus, Minus, Cross, Div];

  constructor(scene: g.Scene, answer: Answer, score: Score) {
    this.scene = scene;
    const plus = new Plus(this.scene, answer, score);
    const minus = new Minus(this.scene, answer, score);
    const cross = new Cross(this.scene, answer, score);
    const div = new Div(this.scene, answer, score);
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
