export abstract class SceneController {
  abstract createScene(_game: g.Game): g.Scene;

  protected abstract onLoaded(_scene: g.Scene): boolean;

  protected abstract onUpdate(_scene: g.Scene): boolean;
}
