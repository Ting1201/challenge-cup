export default class Ground {
  constructor() {
    const size = spacing * (gridSize*2 + 1);
    const geometry = new THREE.PlaneGeometry(size, size);
    const texture = new THREE.TextureLoader().load('/textures/ground.jpg');
    
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8
    }));
    this.mesh.rotation.x = -Math.PI/2;
  }
} 