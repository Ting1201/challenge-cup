<template>
  <div>
    <div class="scene" ref="sceneDiv"></div>
  </div>
</template>

<script setup>
// import testVertex from "@/shader/test/Vertex.glsl";
import { onMounted, ref, onUnmounted } from "vue";
import gsap from "gsap";

// 初始化调整屏幕
import "@/three/init";

// 导入场景
import scene from "@/three/scene";

// 导入相机
import camera from "@/three/camera";

// 导入gui

import gui from "@/three/gui";

// 导入渲染器
import renderer from "@/three/renderer";

// 导入控制器
// import controls from "@/three/controls";

// 导入坐标轴

import axesHelper from "@/three/axesHelper";

// 每一帧的执行函数

import animate from "@/three/animate";

import createMesh from "@/three/createMesh";

import { initKeyboardControls, disposeKeyboardControls } from '@/three/controls/keyboardControls'

console.log(gui);
// 场景元素 div
let sceneDiv = ref(null);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(0, 400, 1000); // 提升高度并拉远距离
camera.lookAt(0, 0, 0);
camera.near = 1;
camera.far = 10000;  // 扩大可视范围
scene.add(camera);
// 加入辅助轴，帮助我们查看3维坐标轴
scene.add(axesHelper);

// 创建物体
createMesh();

onMounted(() => {
  initKeyboardControls()
  sceneDiv.value.appendChild(renderer.domElement);
  
  // 初始位置更远处
  camera.position.set(0, 300, 800);
  
  // 添加缓动动画
  gsap.to(camera.position, {
    x: 0,
    y: 300,
    z: 500,
    duration: 7,
    ease: "power2.out",
    onUpdate: () => {
      camera.lookAt(0, 0, 0);
    }
  });

  animate();
});

// 添加卸载时的清理
onUnmounted(() => {
  disposeKeyboardControls()
})
</script>
<script>
// Explicitly define the component name
export default {
  name: "MySceneComponent", // Changed from "Scene" to "MySceneComponent"
};
</script>
<style scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
