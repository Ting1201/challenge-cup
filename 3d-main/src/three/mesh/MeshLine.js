import * as THREE from "three";
import scene from "@/three/scene";
import gsap from "gsap";

export default class MeshLine {
  constructor(geometry) {
    const edges = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}

export class RainEffect {
  constructor() {
    this.particleCount = 5000;
    this.instanceCount = 4;
    
    const baseGeometry = new THREE.BufferGeometry();
    baseGeometry.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array([0,0,0, 0,1,0]), 3
    ));
    
    const offsets = new Float32Array(this.particleCount * 3);
    for(let i = 0; i < this.particleCount; i++) {
      offsets[i*3] = (Math.random() - 0.5) * 200;
      offsets[i*3+1] = Math.random() * 100 + 50;
      offsets[i*3+2] = (Math.random() - 0.5) * 200;
    }
    baseGeometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
    
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 2.0 },
        projectionMatrix: { value: new THREE.Matrix4() },
        modelViewMatrix: { value: new THREE.Matrix4() }
      },
      vertexShader: `
        attribute vec3 position;
        attribute vec3 offset;
        uniform mat4 projectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec3 vPosition;

        void main() {
          vec3 pos = position + offset;
          pos.y -= mod(uTime * uSpeed + offset.x * 0.1, 20.0);
          if(pos.y < 0.0) pos.y += 20.0;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.0;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        void main() {
          float alpha = 0.6 * (1.0 - smoothstep(0.0, 20.0, vPosition.y));
          gl_FragColor = vec4(0.7, 0.8, 1.0, alpha);
          if(length(gl_PointCoord - 0.5) > 0.3) discard;
        }
      `,
      transparent: true,
      depthWrite: false
    });
    
    this.mesh = new THREE.InstancedMesh(
      baseGeometry,
      this.material,
      this.particleCount
    );
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    gsap.ticker.add(() => {
      this.material.uniforms.uTime.value += 0.016;
    });

    this.material.onCompile = (
      
    ) => {
      console.log('Shader compiled successfully');
    };
  }
}

export class BuildingHighlighter {
  constructor() {
    this.infoPanel = new InfoPanel();
    // ...原有代码...
  }

  onMouseMove(
    /* eslint-disable-next-line no-unused-vars */
    event
  ) {
    // ...原有高亮逻辑...
    
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    
    if(intersects.length > 0) {
      this.infoPanel.showInfo(intersects[0].object.userData);
    } else {
      this.infoPanel.hide();
    }
  }
}

class InfoPanel {
  constructor() {
    this.domElement = document.createElement('div');
    // 创建DOM样式...
  }
  
  showInfo(data) {
    if (!data) return;
    console.log('显示建筑数据:', data);
    this.domElement.innerHTML = `
      <h3>${data.name || '未命名建筑'}</h3>
      <p>用电量: ${data.power || 0}kW</p>
      <p>人流量: ${data.passengers || 0}/小时</p>
    `;
  }
}

export class DataPanel {
  constructor() {
    this.socket = new WebSocket('wss://api.example.com/realtime');
    this.socket.onmessage = (event) => {
      this.updateData(JSON.parse(event.data));
    };
  }

  updateData(data) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillText(`当前数据: ${JSON.stringify(data)}`, 10, 20);
    this.texture = new THREE.CanvasTexture(canvas);
  }
}
