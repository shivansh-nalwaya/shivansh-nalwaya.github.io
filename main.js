import { Project, Scene3D, PhysicsLoader, ExtendedObject3D, THREE } from "enable3d";
import { TextureLoader } from "three";
import Stats from "three/examples/jsm/libs/stats.module";

const stats = Stats();
document.body.appendChild(stats.dom);

let tempVector = new THREE.Vector3();
let activeAction = "idle",
  previousAction;
class MainScene extends Scene3D {
  constructor() {
    super("MainScene");
    this.speed = 3;
    this.turnSpeed = 3;
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {
    const map = this.load.preload("map", "/assets/scene.gltf");
    const character = this.load.preload("character", "/assets/character.fbx");
    const python = this.load.preload("python", "/assets/python.gltf");
    const idle = this.load.preload("idle", "/assets/idle.fbx");
    const walk = this.load.preload("walk", "/assets/walk.fbx");
    const run = this.load.preload("run", "/assets/run.fbx");
    const swim = this.load.preload("swim", "/assets/swim.fbx");

    await Promise.all([character, idle, walk, run, swim, map, python]);
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

    const map = (await this.load.gltf("map")).scene;
    map.scale.setScalar(10);
    this.map = new ExtendedObject3D();
    this.map.name = "map";
    this.map.add(map);
    this.map.rotation.set(0, 0, 0);
    this.map.position.set(0, 0, 0);
    const loader = new TextureLoader();
    this.map.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
        if (child.name == "Sand") {
          child.material.map = loader.load("/assets/sand-map.png");
          child.material.normalMap = loader.load("/assets/sand-normal.png");
        }
      }
    });
    this.add.existing(this.map);
    this.physics.add.existing(this.map, {
      shape: "concave",
      mass: 1,
      collisionFlags: 2,
    });

    const man = await this.load.fbx("character");

    const manAnims = new THREE.AnimationMixer(man);
    this.animationMixers.add(manAnims);

    const idle = await this.load.fbx("idle");
    this.manIdleAction = manAnims.clipAction(idle.animations[0]);

    const walk = await this.load.fbx("walk");
    this.manWalkAction = manAnims.clipAction(walk.animations[0]);

    const swim = await this.load.fbx("swim");
    this.manSwimAction = manAnims.clipAction(swim.animations[0]);

    const run = await this.load.fbx("run");
    this.manRunAction = manAnims.clipAction(run.animations[0]);

    this.actions = {
      walk: this.manWalkAction,
      idle: this.manIdleAction,
      swim: this.manSwimAction,
      run: this.manRunAction,
    };

    man.scale.setScalar(0.01);
    man.rotateY(Math.PI);

    this.man = new ExtendedObject3D();
    this.man.name = "character";
    this.man.add(man);
    this.man.position.set(0, 10, 5);
    this.man.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
      }
    });

    this.add.existing(this.man);
    this.physics.add.existing(this.man, {
      shape: "sphere",
      radius: 0.5,
      offset: { y: -0.5 },
    });
    this.man.body.setFriction(5);
    this.man.body.setAngularFactor(0, 0, 0);
    this.man.body.setCcdMotionThreshold(1e-7);
    this.man.body.setCcdSweptSphereRadius(0.25);

    this.water = this.add.plane({ x: -54, z: 0, y: -0.1, height: 12, width: 19 }, { lambert: { color: 0x24a8af, opacity: 0.8, transparent: true } });
    this.water.rotateX(Math.PI / 2);

    this.keys = {
      up: { isDown: false },
      left: { isDown: false },
      right: { isDown: false },
      down: { isDown: false },
      shift: { isDown: false },
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
        case 39: // right
          this.keys.right.isDown = isDown;
          break;
      }
      if (e.shiftKey) {
        this.speed = 20;
        this.running = true;
      } else {
        this.speed = 3;
        this.running = false;
      }
    };
    document.addEventListener("keydown", (e) => press(e, true));
    document.addEventListener("keyup", (e) => press(e, false));
  }

  fadeToAction(name, duration) {
    if (name == activeAction) {
      this.actions[activeAction].play();
      return;
    }
    previousAction = activeAction;
    activeAction = name;
    this.actions[previousAction].fadeOut(duration);
    this.actions[activeAction].reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration);
  }

  update() {
    if (this.keys.left.isDown) this.man.body.setAngularVelocityY(this.turnSpeed);
    else if (this.keys.right.isDown) this.man.body.setAngularVelocityY(-this.turnSpeed);
    else this.man.body.setAngularVelocityY(0);
    if (this.keys.up.isDown) {
      this.man.body.setVelocityZ(Math.cos(this.man.body.rotation.y) * -this.speed);
      this.man.body.setVelocityX(Math.sin(this.man.body.rotation.y) * -this.speed);
    }
    if ((this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown) && this.man.position.y > -1) {
      if (this.running) this.fadeToAction("run", 0.5);
      else this.fadeToAction("walk", 0.5);
      this.man.children[0].position.y = 0;
    } else if (this.man.position.y <= -1) {
      this.fadeToAction("swim", 0.1);
      this.man.children[0].position.y = 0.5;
    } else {
      this.fadeToAction("idle", 0.5);
      this.man.children[0].position.y = 0;
    }
    this.camera.position.copy(this.man.body.position);
    this.camera.position.x += Math.sin(this.man.body.rotation.y) * 5;
    this.camera.position.z += Math.cos(this.man.body.rotation.y) * 5;
    this.camera.position.y += 1.5;
    tempVector.copy(this.man.body.position).y += 1.5;
    this.camera.lookAt(tempVector);

    stats.update();
  }
}

const config = { scenes: [MainScene], antialias: true };

PhysicsLoader("/lib", () => new Project(config));

9146539656347357;
