varying vec2 vUv;

uniform float time;
uniform sampler2D channel0;

void main() {
  gl_FragColor = mix(texture2D(channel0, vUv), vec4(vec3(vUv.x, vUv.y, sin(time)), 1.0), 0.5);
}
