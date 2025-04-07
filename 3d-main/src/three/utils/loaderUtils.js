import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadModel = (path) => {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(
      path,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
}; 