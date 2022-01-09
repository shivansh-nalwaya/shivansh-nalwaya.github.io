import { Project, Scene3D, PhysicsLoader, ExtendedObject3D, THREE } from "enable3d";

let tempVector = new THREE.Vector3();
class MainScene extends Scene3D {
  constructor() {
    super("MainScene");
    this.speed = 8;
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {
    const untitled = this.load.preload("untitled", "/assets/untitled.gltf");
    const gallary = this.load.preload("gallary", "/assets/gallary.gltf");
    const character = this.load.preload("character", "/assets/character.fbx");
    const idle = this.load.preload("idle", "/assets/idle.fbx");
    const walk = this.load.preload("walk", "/assets/walk.fbx");

    await Promise.all([character, idle, walk, gallary, untitled]);
  }

  async create() {
    const { lights } = await this.warpSpeed("-ground", "-grid");

    lights.directionalLight.shadow.bias = -0.001;
    lights.directionalLight.shadow.mapSize.width = 2048;
    lights.directionalLight.shadow.mapSize.height = 2048;
    lights.directionalLight.shadow.camera.near = 0.1;
    lights.directionalLight.shadow.camera.far = 500.0;
    lights.directionalLight.shadow.camera.near = 0.5;
    lights.directionalLight.shadow.camera.far = 500.0;
    lights.directionalLight.shadow.camera.left = 250;
    lights.directionalLight.shadow.camera.right = -250;
    lights.directionalLight.shadow.camera.top = 250;
    lights.directionalLight.shadow.camera.bottom = -250;

    this.physics.debug.enable();

    this.camera.position.set(0, 3, 13);

    const untitled = (await this.load.gltf("untitled")).scene;
    untitled.scale.setScalar(10);
    this.untitled = new ExtendedObject3D();
    this.untitled.name = "untitled";
    this.untitled.add(untitled);
    this.untitled.rotation.set(0, 0, 0);
    this.untitled.position.set(0, 0, 0);
    this.untitled.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    this.add.existing(this.untitled);
    this.physics.add.existing(this.untitled, {
      shape: "box",
      width: 100,
      depth: 100,
      height: 0,
      mass: 0,
      collisionFlags: 1,
    });

    const gallary = (await this.load.gltf("gallary")).scene;
    gallary.scale.setScalar(10);
    this.gallary = new ExtendedObject3D();
    this.gallary.name = "gallary";
    this.gallary.add(gallary);
    this.gallary.rotation.set(0, Math.PI / 2, 0);
    this.gallary.position.set(0, -0.1, 32);
    this.gallary.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
        child.material.color = new THREE.Color(0xbbbb00);
      }
    });
    this.add.existing(this.gallary);
    this.physics.add.existing(this.gallary, {
      shape: "concave",
      mass: 1,
      collisionFlags: 2,
    });

    this.floor = this.add.cylinder({ height: 0.1, radiusBottom: 9.99, radiusTop: 9.99, radiusSegments: 10 }, { lambert: 0x00ff00 });
    this.floor.position.set(0, 0, 32);
    this.floor.rotation.set(0, Math.PI / 2, 0);

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
    this.man.position.set(0, 0, 0);
    this.man.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
      }
    });

    this.add.existing(this.man);
    this.physics.add.existing(this.man, {
      shape: "box",
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
