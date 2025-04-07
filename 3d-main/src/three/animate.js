import * as THREE from "three";
import controls from "@/three/controls";
// 导入渲染器
import renderer from "@/three/renderer";
// 导入场景
import scene from "@/three/scene";
// 导入相机
import camera from "@/three/camera";
import { composer } from "@/three/postprocessing";
import { updateCameraPosition } from '@/three/controls/keyboardControls'

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  
  // 更新相机位置
  updateCameraPosition(delta);
  
  // 修改为使用后期处理渲染器
  composer.render();
  // 保留原有动画逻辑
  controls.update();
  clock.getElapsedTime();
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

export default animate;
