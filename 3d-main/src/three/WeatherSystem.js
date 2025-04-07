import scene from "@/three/scene";

export class WeatherSystem {
  constructor() {
    this.currentWeather = 'sunny';
    this.effects = {
      rain: new RainEffect(),
      snow: new SnowEffect(),
      fog: new FogEffect()
    };
  }

  setWeather(type) {
    this.clearEffects();
    this.currentWeather = type;
    scene.add(this.effects[type].mesh);
  }

  clearEffects() {
    Object.values(this.effects).forEach(effect => {
      scene.remove(effect.mesh);
    });
  }
} 