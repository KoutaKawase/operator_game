import { Choice } from '../Choice';
import { Operator } from '../Problem';

export class Minus extends g.Sprite {
  private operator: Operator = '-';

  constructor(scene: g.Scene) {
    super({
      scene,
      src: scene.assets['minus'],
      x: Choice.spriteWidth + Choice.marginRight,
      y: Choice.y,
      touchable: true,
    });
  }

  public initHandler(): void {
    this.pointDown.add(() => {
      console.log('You touched' + this.operator + ' operator');
    });
  }
}
