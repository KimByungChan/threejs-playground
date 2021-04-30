import * as THREE from "three";
import Entity from "./Entity";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export default class Application {
  clock: THREE.Clock;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  fxaa: ShaderPass;
  composer: EffectComposer;

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

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.fxaa = new ShaderPass(FXAAShader);
    this.fxaa.material.uniforms.resolution.value.x = 1 / window.innerWidth;
    this.fxaa.material.uniforms.resolution.value.y = 1 / window.innerHeight;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.fxaa);

    this.camera.position.z = 5;

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.resize);
    window.requestAnimationFrame(this.render);
  }

  addEntity(...entities: Entity[]) {
    entities.forEach((entity) => {
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
    this.composer.render();
  };
}
