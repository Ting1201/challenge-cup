varying vec2 vUv;
uniform sampler2D uDataTexture;
uniform float uTime;
uniform float uScanSpeed;

void main() {
  vec3 color = texture2D(uDataTexture, vUv).rgb;
  
  // 扫描线效果
  float scan = step(0.8, mod((vUv.y + uTime * uScanSpeed) * 10.0, 1.0));
  color += scan * vec3(0.5, 1.0, 0.8);
  
  // 边缘光效
  float edge = pow(1.0 - length(vUv - 0.5) * 2.0, 4.0);
  color += edge * vec3(0.2, 0.5, 1.0);

  gl_FragColor = vec4(color, 0.9 - length(vUv - 0.5));
} 