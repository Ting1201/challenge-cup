import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "@/three/scene";
import modifyCityMaterial from "@/three/modify/modifyCityMaterial";
import FlyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import MeshLine from "./MeshLine";
import LightWall from "./LightWall";
import AlarmSprite from "./AlarmSprite";
import HolographicProjection from './HolographicProjection';

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  const gridSize = 3; // 平铺3x3网格
  const spacing = 900; // 根据实际模型尺寸调整

  // 使用InstancedMesh优化
  const cityGeometry = new Map();

  gltfLoader.load('/model/city.glb', (gltf) => {
    console.log('原始模型包含网格数量:', 
      Array.from(gltf.scene.children)
        .filter(obj => obj.isMesh).length
    );
    
    const baseCity = gltf.scene;
    
    // 正确遍历原始模型的所有网格
    baseCity.traverse((obj) => {
      if(obj.isMesh) {
        if(!cityGeometry.has(obj.geometry.uuid)) {
          cityGeometry.set(obj.geometry.uuid, {
            geometry: obj.geometry,
            material: obj.material,
            count: 0
          });
        }
        // 总实例数 = 网格数量 × 平铺数量
        cityGeometry.get(obj.geometry.uuid).count = (gridSize*2+1)**2;
      }
    });

    // 处理材质和网格线
    baseCity.traverse((item) => {
      if (item.isMesh) {
        modifyCityMaterial(item);

        if (item.name == "Layerbuildings") {
          const meshLine = new MeshLine(item.geometry);
          meshLine.mesh.scale.copy(item.scale);
          scene.add(meshLine.mesh);
        }
      }
    });

    // 创建实例化网格
    cityGeometry.forEach((value) => {
      const instancedMesh = new THREE.InstancedMesh(
        value.geometry,
        value.material,
        value.count // 直接使用计算好的实例数
      );
      
      let instanceID = 0;
      const total = gridSize*2+1;
      for(let x = 0; x < total; x++) {
        for(let z = 0; z < total; z++) {
          const matrix = new THREE.Matrix4();
          const posX = (x - gridSize) * spacing;
          const posZ = (z - gridSize) * spacing;
          matrix.setPosition(posX, 0, posZ);
          instancedMesh.setMatrixAt(instanceID++, matrix);
        }
      }
      scene.add(instancedMesh);
    });
  });

  // 添加飞线
  const flyLine = new FlyLine();
  scene.add(flyLine.mesh);

  //   // // 添加着色器飞线
  const flyLineShader = new FlyLineShader({ x: 10, z: 10 });
  scene.add(flyLineShader.mesh);
  // 添加光墙
  const lightWall = new LightWall();
  scene.add(lightWall.mesh);

  // 添加警告标识
  const alarmSprite = new AlarmSprite();
  scene.add(alarmSprite.mesh);
  alarmSprite.onClick(function (e) {
    console.log("警告", e);
  });

  // 创建全息投影
  const hologram = new HolographicProjection({
    position: {x: 15, z: -8},
    size: 10,
    dataTextures: ['population', 'energy']
  });
  scene.add(hologram.mesh);

  // 将几何体预计算并复用
  const sharedGeometry = new THREE.RingGeometry(3, 5, 64);
  sharedGeometry.computeBoundingSphere();
}
