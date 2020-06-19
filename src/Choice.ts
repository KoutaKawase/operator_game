import { Plus, Minus, Cross, Div } from './operatos';
import { Answer } from './Answer';
import { Score } from './Score';
import { Problem } from './Problem';
import { FoxComment } from './FoxComment';

export type OpeInfo = {
  scene: g.Scene;
  answer: Answer;
  score: Score;
  problem: Problem;
  fc: FoxComment;
};

export class Choice {
  private scene: g.Scene;
  private readonly operators: [Plus, Minus, Cross, Div];

  constructor(scene: g.Scene, answer: Answer, score: Score, problem: Problem, fc: FoxComment) {
    this.scene = scene;
    const operatorInfo = { scene: this.scene, answer, score, problem, fc };
    const plus = new Plus(operatorInfo);
    const minus = new Minus(operatorInfo);
    const cross = new Cross(operatorInfo);
    const div = new Div(operatorInfo);
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

  blockTouch(): void {
    this.operators.forEach((o) => {
      o.touchable = false;
    });
  }
}
