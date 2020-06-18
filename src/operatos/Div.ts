import { Choice } from '../Choice';
import { Operator } from '../Problem';

export class Div extends g.Sprite {
  private operator: Operator = '/';

  constructor(scene: g.Scene) {
    super({
      scene,
      src: scene.assets['div'],
      x: Choice.spriteWidth * 3 + Choice.marginRight,
      y: Choice.y,
      touchable: true,
    });
  }

  public initHandler(): void {
    this.pointDown.add(() => {
      console.log('You touched ' + this.operator + ' operator');
    });
  }
}
