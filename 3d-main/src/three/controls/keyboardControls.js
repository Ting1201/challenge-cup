import * as THREE from 'three'
import camera from '@/three/camera'

const moveSpeed = 2; // 更缓慢的基础速度
const keys = { w: false, a: false, s: false, d: false }
let velocity = new THREE.Vector3()
const damping = 0.85 // 阻尼系数 0-1
let autoMoveEnabled = true; // 新增自动移动标志

// 初始化键盘事件监听
export function initKeyboardControls() {
  // 初始即开启向前移动
  keys.w = autoMoveEnabled;
  
  window.addEventListener('keydown', (e) => handleKeyDown(e))
  window.addEventListener('keyup', (e) => handleKeyUp(e))
}

// 清除事件监听
export function disposeKeyboardControls() {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
}

function handleKeyDown(e) {
  // 当用户主动操作时关闭自动移动
  if (autoMoveEnabled && ['w','a','s','d'].includes(e.key.toLowerCase())) {
    autoMoveEnabled = false;
  }
  switch(e.key.toLowerCase()) {
    case 'w': keys.w = true; break
    case 'a': keys.a = true; break
    case 's': keys.s = true; break
    case 'd': keys.d = true; break
  }
}

function handleKeyUp(e) {
  switch(e.key.toLowerCase()) {
    case 'w': keys.w = false; break
    case 'a': keys.a = false; break
    case 's': keys.s = false; break
    case 'd': keys.d = false; break
  }
}

// 在动画循环中更新位置
export function updateCameraPosition(deltaTime) {
  const speed = moveSpeed * deltaTime
  const direction = new THREE.Vector3()
  const cameraDirection = new THREE.Vector3()
  
  camera.getWorldDirection(cameraDirection)
  cameraDirection.y = 0 // 保持水平移动
  cameraDirection.normalize()

  // 计算右侧方向
  const right = new THREE.Vector3()
  right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0))

  if(keys.w) direction.add(cameraDirection)
  if(keys.s) direction.sub(cameraDirection)
  if(keys.d) direction.add(right)
  if(keys.a) direction.sub(right)

  if(direction.length() > 0) {
    direction.normalize()
    velocity.addScaledVector(direction, speed)
  }

  velocity.multiplyScalar(damping)
  camera.position.add(velocity)
} 