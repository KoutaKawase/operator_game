export class Choice {
  private scene: g.Scene;
  private readonly plus: g.Sprite;
  private readonly minus: g.Sprite;
  private readonly cross: g.Sprite;
  private readonly div: g.Sprite;
  static readonly marginRight = 24;
  static readonly spriteWidth = 80;
  static readonly y = 278;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.plus = new g.Sprite({
      scene,
      src: scene.assets['plus'],
      x: Choice.marginRight,
      y: Choice.y,
    });
    this.minus = new g.Sprite({
      scene,
      src: scene.assets['minus'],
      x: Choice.spriteWidth + Choice.marginRight,
      y: Choice.y,
    });
    this.cross = new g.Sprite({
      scene,
      src: scene.assets['cross'],
      x: Choice.spriteWidth * 2 + Choice.marginRight,
      y: Choice.y,
    });
    this.div = new g.Sprite({
      scene,
      src: scene.assets['div'],
      x: Choice.spriteWidth * 3 + Choice.marginRight,
      y: Choice.y,
    });
  }

  show(): void {
    this.scene.append(this.plus);
    this.scene.append(this.minus);
    this.scene.append(this.cross);
    this.scene.append(this.div);
  }
}
