import * as THREE from 'three';
import gsap from 'gsap';
import camera from "@/three/camera";

export default class DataFlow {
  constructor(points = [], color = 0x00ff00) {
    // 1. 创建粒子系统
    const vertices = [];
    const colors = [];
    
    points.forEach(point => {
      vertices.push(point.x, point.y, point.z);
      colors.push(color.r, color.g, color.b);
    });

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', 
      new THREE.Float32BufferAttribute(vertices, 3));
    this.geometry.setAttribute('color',
      new THREE.Float32BufferAttribute(colors, 3));

    // 2. 动态材质
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.5 }
      },
      vertexShader: `
        varying vec3 vColor;
        uniform float uTime;
        uniform float uSpeed;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(uTime * uSpeed + position.x) * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 5.0;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
          gl_FragColor.a *= 0.8 - length(gl_PointCoord - 0.5);
        }
      `,
      transparent: true,
      depthWrite: false
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
    
    // 3. 动画循环
    gsap.ticker.add(() => {
      this.material.uniforms.uTime.value += 0.016;
    });
  }

  updatePath(newPoints) {
    // 数据更新方法
    const positions = this.geometry.attributes.position.array;
    newPoints.forEach((point, i) => {
      positions[i*3] = point.x;
      positions[i*3+1] = point.y;
      positions[i*3+2] = point.z;
    });
    this.geometry.attributes.position.needsUpdate = true;
  }

  // 添加鼠标交互
  addInteraction() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      this.raycaster.setFromCamera(this.mouse, camera);
      const intersects = this.raycaster.intersectObject(this.mesh);
      
      if (intersects.length > 0) {
        this.highlightPoint(intersects[0].index);
      }
    });
  }

  highlightPoint(index) {
    // 实现高亮逻辑
    console.log('Highlight index:', index); // 添加实际逻辑前暂时使用
  }
} 