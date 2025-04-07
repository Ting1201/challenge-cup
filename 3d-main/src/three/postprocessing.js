import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import * as THREE from 'three';
import renderer from '@/three/renderer';
import scene from '@/three/scene';
import camera from '@/three/camera';

// 导出composer供其他模块使用
export const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   2.0,
//   0.4,
//   0.6
// );
// composer.addPass(bloomPass); 