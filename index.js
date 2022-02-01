const { Project, PhysicsLoader, Scene3D, ExtendedObject3D, JoyStick, THREE } = ENABLE3D;
const { TextureLoader, Matrix4, Vector3, AnimationMixer, sRGBEncoding } = THREE;

const stats = Stats();
stats.domElement.style.position = "fixed";
document.body.appendChild(stats.domElement);

const isMobile = window.outerWidth < 1000,
  isTouchDevice = "ontouchstart" in window,
  rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
let tempVector = new Vector3();
let activeAction = "idle",
  previousAction;

const textureMapping = (texture) => {
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(5, 6.3);
};
class MainScene extends Scene3D {
  constructor() {
    super("MainScene");
    this.speed = 4;
    this.turnSpeed = 3;
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {
    const map = this.load.preload("map", "/assets/scene.gltf");
    const react = this.load.preload("react", "/assets/react.gltf");
    const python = this.load.preload("python", "/assets/python.gltf");
    const ruby = this.load.preload("ruby", "/assets/ruby.gltf");
    const node = this.load.preload("node", "/assets/node.gltf");
    const character = this.load.preload("character", "/assets/character.fbx");
    const idle = this.load.preload("idle", "/assets/idle.fbx");
    const walk = this.load.preload("walk", "/assets/walk.fbx");
    const run = this.load.preload("run", "/assets/run.fbx");

    await Promise.all([map, character, react, python, ruby, node, idle, walk, run]);
  }

  async create() {
    const { lights } = await this.warpSpeed("-ground", "-grid");

    lights.directionalLight.shadow.bias = -0.001;
    lights.directionalLight.shadow.mapSize.width = 2048;
    lights.directionalLight.shadow.mapSize.height = 2048;
    lights.directionalLight.shadow.camera.near = 0.5;
    lights.directionalLight.shadow.camera.far = 500.0;
    lights.directionalLight.shadow.camera.left = 250;
    lights.directionalLight.shadow.camera.right = -250;
    lights.directionalLight.shadow.camera.top = 250;
    lights.directionalLight.shadow.camera.bottom = -250;

    // this.camera.near = 7;
    // this.camera.updateProjectionMatrix();

    // this.physics.debug.enable();

    const react = (await this.load.gltf("react")).scene;
    react.scale.setScalar(2);
    this.react = new ExtendedObject3D();
    this.react.name = "react";
    this.react.position.set(-10, 1, -15);
    this.react.add(react);
    this.add.existing(this.react);

    const python = (await this.load.gltf("python")).scene;
    python.scale.setScalar(2);
    this.python = new ExtendedObject3D();
    this.python.name = "python";
    this.python.position.set(-20, 1, -15);
    this.python.add(python);
    this.add.existing(this.python);

    const ruby = (await this.load.gltf("ruby")).scene;
    ruby.scale.setScalar(2);
    this.ruby = new ExtendedObject3D();
    this.ruby.name = "ruby";
    this.ruby.position.set(-20, 1, -23);
    this.ruby.add(ruby);
    this.add.existing(this.ruby);

    const node = (await this.load.gltf("node")).scene;
    node.scale.setScalar(2.5);
    this.node = new ExtendedObject3D();
    this.node.name = "node";
    this.node.position.set(-10, 1, -23);
    this.node.add(node);
    this.add.existing(this.node);

    const loader = new THREE.TextureLoader();

    const map = (await this.load.gltf("map")).scene;
    map.scale.setScalar(3);
    this.map = new ExtendedObject3D();
    this.map.name = "map";
    this.map.add(map);
    this.map.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
        if (child.parent.name == "Board001") if (child.name == "Cylinder009_1") child.material.map = loader.load("assets/certificates/0001.jpg", textureMapping);
        if (child.parent.name == "Board002") if (child.name == "Cylinder010_1") child.material.map = loader.load("assets/certificates/0001.jpg", textureMapping);
        if (child.parent.name == "Board003") if (child.name == "Cylinder011_1") child.material.map = loader.load("assets/certificates/0001.jpg", textureMapping);
        if (child.parent.name == "Board005") if (child.name == "Cylinder001_1") child.material.map = loader.load("assets/certificates/0001.jpg", textureMapping);
        if (child.parent.name == "Project") if (child.name == "Cube031_1") child.material.map = loader.load("assets/projects/project-1.png", textureMapping);
      }
    });
    this.add.existing(this.map);
    this.physics.add.existing(this.map, {
      shape: "concave",
      mass: 1,
      collisionFlags: 2,
    });

    const man = await this.load.fbx("character");

    const manAnims = new AnimationMixer(man);
    this.animationMixers.add(manAnims);

    const idle = await this.load.fbx("idle");
    this.manIdleAction = manAnims.clipAction(idle.animations[0]);

    const walk = await this.load.fbx("walk");
    this.manWalkAction = manAnims.clipAction(walk.animations[0]);

    const run = await this.load.fbx("run");
    this.manRunAction = manAnims.clipAction(run.animations[0]);

    this.actions = {
      walk: this.manWalkAction,
      idle: this.manIdleAction,
      run: this.manRunAction,
    };

    man.scale.setScalar(0.012);
    man.rotateY(Math.PI);

    this.man = new ExtendedObject3D();
    this.man.name = "man";
    this.man.add(man);
    this.man.position.set(0, 0, 8);
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
        this.speed = 8;
        this.running = true;
      } else {
        this.speed = 4;
        this.running = false;
      }
    };
    document.addEventListener("keydown", (e) => press(e, true));
    document.addEventListener("keyup", (e) => press(e, false));

    if (isTouchDevice) {
      const joystick = new JoyStick();
      const axis = joystick.add.axis({
        styles: { right: 2 * rem, bottom: 3 * rem, size: 100 },
      });
      axis.onMove((event) => {
        const { top, right } = event;
        this.keys.up.isDown = top > 0;
        this.keys.left.isDown = right < 0;
        this.keys.right.isDown = right > 0;
        this.speed = Math.abs(top) * 10;
        this.running = this.speed > 5;
        this.turnSpeed = Math.abs(right);
      });
    }
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
    if (this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown) {
      document.getElementById("pointer").style.bottom = 5.2 - this.man.position.z / 27 + "rem";
      document.getElementById("pointer").style.left = 6.2 + this.man.position.x / 23 + "rem";
    }
    if (this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown) {
      if (this.running) this.fadeToAction("run", 0.5);
      else this.fadeToAction("walk", 0.5);
    } else {
      this.fadeToAction("idle", 0.5);
    }

    this.camera.position.copy(this.man.body.position);
    this.camera.position.x += Math.sin(this.man.body.rotation.y) * 5 * (isMobile ? 2.3 : 1.4);
    this.camera.position.z += Math.cos(this.man.body.rotation.y) * 5 * (isMobile ? 2.3 : 1.4);
    this.camera.position.y += 1.5 * (isMobile ? 2.3 : 3);
    tempVector.copy(this.man.body.position).y += 3;
    this.camera.lookAt(tempVector);

    this.react.rotateY(0.015);
    this.python.rotateY(0.015);
    this.ruby.rotateY(0.015);
    this.node.rotateY(0.015);

    // let minToEmission = null,
    //   minDist = 21;
    // this.map.traverse((child) => {
    //   if (child.isMesh) {
    //     var point1 = new Vector3(),
    //       point2 = new Vector3();
    //     point1.setFromMatrixPosition(this.man.matrixWorld);
    //     point2.setFromMatrixPosition(child.matrixWorld);
    //     var distance = point1.distanceTo(point2);
    //     if (child.parent.userData.emissive == 1 && distance < 20) {
    //       if (distance < minDist) {
    //         minDist = distance;
    //         minToEmission = child;
    //       }
    //     }
    //   }
    // });
    stats.update();
  }
}

const config = { scenes: [MainScene], antialias: true };

PhysicsLoader("/lib", () => new Project(config));
