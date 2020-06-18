import { Choice } from '../Choice';
import { Operator } from '../Problem';

export class Cross extends g.Sprite {
  private operator: Operator = '*';

  constructor(scene: g.Scene) {
    super({
      scene,
      src: scene.assets['cross'],
      x: Choice.spriteWidth * 2 + Choice.marginRight,
      y: Choice.y,
      touchable: true,
    });
  }

  public initHandler(): void {
    this.pointDown.add(() => {
      console.log('You touched' + this.operator + ' operator.');
    });
  }
}
