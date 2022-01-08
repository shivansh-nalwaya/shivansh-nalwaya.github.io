import { Project, Scene3D, PhysicsLoader, ExtendedObject3D, THREE } from "enable3d";

class MainScene extends Scene3D {
  constructor() {
    super("MainScene");
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {
    const man = this.load.preload("man", "/assets/box_man.glb");
    const character = this.load.preload("character", "/assets/character.fbx");

    await Promise.all([man, character]);
  }

  async create() {
    const { ground } = await this.warpSpeed("-grid");

    ground.material.color = new THREE.Color(0x00ff00);

    this.physics.debug.enable();

    const man = await this.load.fbx("character");
    man.scale.setScalar(0.01); // a hack

    this.man = new ExtendedObject3D();
    this.man.name = "character";
    this.man.rotateY(Math.PI + 0.1); // a hack
    this.man.add(man);
    this.man.rotation.set(0, 0, 0);
    this.man.position.set(0, 3, 0);
    this.man.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
      }
    });

    this.add.existing(this.man);
    this.physics.add.existing(this.man, {
      shape: "sphere",
      radius: 0.25,
      width: 0.5,
      offset: { y: -0.25 },
    });
    this.man.body.setFriction(0.8);
    this.man.body.setAngularFactor(0, 0, 0);
    this.man.body.setCcdMotionThreshold(1e-7);
    this.man.body.setCcdSweptSphereRadius(0.25);
  }

  update() {}
}

const config = { scenes: [MainScene], antialias: true };

PhysicsLoader("/lib", () => new Project(config));
