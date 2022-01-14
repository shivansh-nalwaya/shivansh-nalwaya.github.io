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
    const mnt = this.load.preload("mnt", "/assets/mnt.gltf");
    const untitled = this.load.preload("untitled", "/assets/scene.gltf");
    const character = this.load.preload("character", "/assets/character.fbx");
    const python = this.load.preload("python", "/assets/python.gltf");
    const idle = this.load.preload("idle", "/assets/idle.fbx");
    const walk = this.load.preload("walk", "/assets/walk.fbx");

    await Promise.all([character, idle, walk, untitled, mnt, python]);
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

    // this.physics.debug.enable();

    this.camera.position.set(10, 10, 10);

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
      shape: "concave",
      mass: 1,
      collisionFlags: 2,
    });

    const mnt = (await this.load.gltf("mnt")).scene;
    mnt.scale.setScalar(0.12);
    mnt.position.set(4, 0, 0);
    const mnt2 = mnt.clone();
    mnt2.position.set(18, 0, 10);
    const mnt3 = mnt.clone();
    mnt3.position.set(25, 0, -6);
    this.mnt = new ExtendedObject3D();
    this.mnt.name = "mnt";
    this.mnt.add(mnt);
    this.mnt.add(mnt2, mnt3);
    this.mnt.position.set(13, 0, -14);
    this.mnt.traverse((child) => (child.castShadow = child.receiveShadow = child.isMesh));
    this.add.existing(this.mnt);
    this.physics.add.existing(this.mnt, {
      shape: "concave",
      mass: 1,
      collisionFlags: 2,
    });
    this.mnt.body.setFriction(50);

    const python = (await this.load.gltf("python")).scene;
    python.scale.setScalar(0.03);
    python.position.set(0, 2, 0);
    python.rotation.set(Math.PI / 2, 0, 5.4);
    this.python = new ExtendedObject3D();
    this.python.name = "python";
    this.python.add(python);
    this.python.position.set(-32, 0, -30);
    this.add.existing(this.python);

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
    this.man.position.set(0, 10, 0);
    this.man.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
      }
    });

    this.add.existing(this.man);
    this.physics.add.existing(this.man, {
      shape: "sphere",
      radius: 0.5,
      offset: { y: -0.25 },
    });
    this.man.body.setFriction(5);
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
