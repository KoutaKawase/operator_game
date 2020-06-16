export class Choice {
  private scene: g.Scene;
  private plus: g.Sprite;
  private minus: g.Sprite;
  private cross: g.Sprite;
  private div: g.Sprite;

  constructor(scene: g.Scene) {
    this.scene = scene;
    this.plus = new g.Sprite({
      scene,
      src: scene.assets['plus'],
      x: 24,
      y: 278,
    });
    this.minus = new g.Sprite({
      scene,
      src: scene.assets['minus'],
      x: 80 + 24,
      y: 278,
    });
    this.cross = new g.Sprite({
      scene,
      src: scene.assets['cross'],
      x: 80 * 2 + 24,
      y: 278,
    });
    this.div = new g.Sprite({
      scene,
      src: scene.assets['div'],
      x: 80 * 3 + 24,
      y: 278,
    });
  }

  show(): void {
    this.scene.append(this.plus);
    this.scene.append(this.minus);
    this.scene.append(this.cross);
    this.scene.append(this.div);
  }
}
