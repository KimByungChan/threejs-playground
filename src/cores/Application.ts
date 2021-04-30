import * as THREE from "three";
import Entity from './Entity';

export default class Application {
  clock: THREE.Clock;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.Renderer;

  entities: Entity[] = [];

  constructor() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.resize);
    window.requestAnimationFrame(this.render);
  }

  addEntity(...entities: Entity[]) {
    entities.forEach(entity => {
      entity.app = this;
      entity.start();
    });

    this.entities.push(...entities);
  }

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  render = () => {
    for (let i = 0, length = this.entities.length; i < length; i++) {
      this.entities[i].update();
    }

    window.requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };
}
