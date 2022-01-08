import { Project, Scene3D, PhysicsLoader, ExtendedObject3D, THREE } from "enable3d";

let tempVector = new THREE.Vector3();
class MainScene extends Scene3D {
  constructor() {
    super("MainScene");
    this.speed = 3;
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {
    const character = this.load.preload("character", "/assets/character.fbx");
    const idle = this.load.preload("idle", "/assets/idle.fbx");
    const walk = this.load.preload("walk", "/assets/walk.fbx");

    await Promise.all([character, idle, walk]);
  }

  async create() {
    const { ground } = await this.warpSpeed("-grid");

    ground.material.color = new THREE.Color(0x00ff00);

    this.physics.debug.enable();

    this.camera.position.set(0, 3, 13);

    this.box = this.physics.add.box({ height: 3, width: 3, depth: 3, mass: 1, collisionFlags: 2 }, { lambert: { color: 0xffff00 } });

    const man = await this.load.fbx("character");

    const idle = await this.load.fbx("idle");
    const manIdle = new THREE.AnimationMixer(man);
    this.manIdleAction = manIdle.clipAction(idle.animations[0]);
    this.animationMixers.add(manIdle);

    const walk = await this.load.fbx("walk");
    const manWalk = new THREE.AnimationMixer(man);
    this.manWalkAction = manWalk.clipAction(walk.animations[0]);
    this.animationMixers.add(manWalk);

    man.scale.setScalar(0.01);
    man.position.set(0, -0.25, 0);
    man.rotateY(Math.PI);

    this.man = new ExtendedObject3D();
    this.man.name = "character";
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
      shape: "box",
      // radius: 0.25,
      width: 0.5,
      offset: { y: -0.25 },
    });
    this.man.body.setFriction(10);
    this.man.body.setAngularFactor(0, 0, 0);
    this.man.body.setCcdMotionThreshold(1e-7);
    this.man.body.setCcdSweptSphereRadius(0.25);

    this.keys = {
      up: { isDown: false },
      left: { isDown: false },
      right: { isDown: false },
      down: { isDown: false },
    };

    const press = (e, isDown) => {
      const { keyCode } = e;
      switch (keyCode) {
        case 37: // left
          this.keys.left.isDown = isDown;
          break;
        case 38: // up
          this.keys.up.isDown = isDown;
          break;
        case 39: // left
          this.keys.right.isDown = isDown;
          break;
      }
    };
    document.addEventListener("keydown", (e) => press(e, true));
    document.addEventListener("keyup", (e) => press(e, false));
  }

  update() {
    if (this.keys.left.isDown) this.man.body.setAngularVelocityY(this.speed);
    else if (this.keys.right.isDown) this.man.body.setAngularVelocityY(-this.speed);
    else this.man.body.setAngularVelocityY(0);
    if (this.keys.up.isDown) {
      this.man.body.setVelocityZ(Math.cos(this.man.body.rotation.y) * -this.speed);
      this.man.body.setVelocityX(Math.sin(this.man.body.rotation.y) * -this.speed);
    }
    if (this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown) {
      this.manIdleAction.stop();
      this.manWalkAction.play();
    } else {
      this.manWalkAction.stop();
      this.manIdleAction.play();
    }
    this.camera.position.copy(this.man.body.position);
    this.camera.position.x += Math.sin(this.man.body.rotation.y) * 5;
    this.camera.position.z += Math.cos(this.man.body.rotation.y) * 5;
    this.camera.position.y += 1.5;
    tempVector.copy(this.man.body.position).y += 1.5;
    this.camera.lookAt(tempVector);
  }
}

const config = { scenes: [MainScene], antialias: true };

PhysicsLoader("/lib", () => new Project(config));
