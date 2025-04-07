import * as THREE from 'three';

export default class HolographicProjection {
  constructor(config) {
    // 创建基础几何体
    this.geometry = new THREE.PlaneGeometry(config.size, config.size);
    
    // 动态材质
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
      wireframe: true // 保留线框效果
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(config.position.x, 5, config.position.z);
    this.mesh.rotation.x = -Math.PI / 2;
  }

  loadDataTexture(dataType) {
    const loader = new THREE.TextureLoader();
    return loader.load(`/textures/data/${dataType}.png`);
  }
} 