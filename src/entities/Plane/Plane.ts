import * as THREE from 'three';
import Entity from '../../cores/Entity';
import fragmentShader from './Plane.frag';
import vertexShader from './Plane.vert';

export default class Plane extends Entity {
  geo: THREE.PlaneBufferGeometry;
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh;

  start() {
    this.geo = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      fragmentShader,
      vertexShader,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.app.scene.add(this.mesh);
  }

  update() {
    this.mat.uniforms.time.value = this.app.clock.getElapsedTime();
  }
}
