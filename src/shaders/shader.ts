export const vertexShader = `
uniform float uCameraSpeed;

varying vec2 vUv;

void main() {
  // Removed displacement effect
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Varyings
  vUv = uv;
}
`;

export const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uAlphaMapTexture;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);

  vec4 color = texture2D(uTexture, vUv);

  // Alpha map
  float alpha = texture2D(uAlphaMapTexture, vUv).r;

  gl_FragColor = vec4(color.xyz, uOpacity * alpha);
}
`; 