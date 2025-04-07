import createCity from "./mesh/City";
import * as THREE from 'three';
import scene from "@/three/scene";
import DataFlow from "./mesh/DataFlow";
import { RainEffect } from './mesh/MeshLine';
import { loadModel } from "@/three/utils/loaderUtils";

export default function createMesh() {
  createCity();
  
  // 添加天气特效
  const rain = new RainEffect();
  scene.add(rain.mesh);
  
  // 添加数据流
  const dataPoints = [
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(5, 5, 2),
    new THREE.Vector3(10, 3, 0)
  ];
  const dataFlow = new DataFlow(dataPoints, new THREE.Color(0x00ff00));
  scene.add(dataFlow.mesh);

  createLODModel();
}

function createLODModel() {
  const lod = new THREE.LOD();
  loadModel('/model/city.glb').then(model => {
    lod.addLevel(model.clone(), 50);
    lod.addLevel(model.clone(), 100);
    scene.add(lod);
  });
}
