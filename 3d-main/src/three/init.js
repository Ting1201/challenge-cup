import * as THREE from 'three';
import scene from '@/three/scene';

// 导入相机
import camera from "@/three/camera";
// 导入渲染器
import renderer from "@/three/renderer";

// 监听屏幕大小改变的变化，设置渲染的尺寸
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});

export function adjustCameraToModel() {
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  camera.position.copy(center);
  camera.position.x += size * 0.5;
  camera.position.y += size * 0.2;
  camera.position.z += size * 0.5;
  camera.lookAt(center);
}
