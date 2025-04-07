import scene from "@/three/scene";

export class EffectManager {
  static effects = new Map();

  static add(name, effect) {
    this.effects.set(name, effect);
    scene.add(effect.mesh);
  }

  static toggle(name, visible) {
    const effect = this.effects.get(name);
    if(effect) effect.mesh.visible = visible;
  }

  static updateAll() {
    this.effects.forEach(effect => {
      if(effect.update) effect.update();
    });
  }
}

// 在animate.js中调用
function animate() {
  EffectManager.updateAll();
  // ...原有动画逻辑...
} 