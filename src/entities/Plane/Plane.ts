import * as THREE from 'three';
import Entity from '../../cores/Entity';
import fragmentShader from './Plane.frag';
import vertexShader from './Plane.vert';
import fruits from '../../images/fruits.png';

export default class Plane extends Entity {
  geo: THREE.PlaneBufferGeometry;
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh;

  start() {
    this.geo = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        channel0: { value: new THREE.Texture },
      },
      fragmentShader,
      vertexShader,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.app.scene.add(this.mesh);

    const loader = new THREE.TextureLoader();
    loader.load(fruits, (texture) => {
      this.mat.uniforms.channel0.value = texture;
    });
  }

  update() {
    this.mat.uniforms.time.value = this.app.clock.getElapsedTime();
  }
}
