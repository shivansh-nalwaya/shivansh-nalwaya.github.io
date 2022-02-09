import TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.min.js";
import content from "/content.js";
const { Project, PhysicsLoader, Scene3D, ExtendedObject3D, JoyStick, THREE } = ENABLE3D;
const { Vector3, AnimationMixer, sRGBEncoding } = THREE;

const isMobile = window.outerWidth < 1000,
  isTouchDevice = "ontouchstart" in window,
  rem = parseFloat(getComputedStyle(document.documentElement).fontSize),
  obstruct = new THREE.Raycaster();
let tempVector = new Vector3();
let activeAction = "idle",
  previousAction;

const textureMappingFlag = (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.rotation = Math.PI;
};

const textureMappingCert = (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.rotation = Math.PI / 2;
  texture.repeat.set(4, 5);
  texture.flipY = false;
};

const textureMappingProject = (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 3.2);
  texture.rotation = Math.PI / 2;
  texture.flipY = false;
};

const linkBoxMaterial = (color, image, loader) => {
  const cubeMaterialArray = [];
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color }));
  cubeMaterialArray.push(
    new THREE.MeshBasicMaterial({
      map: loader.load(image, (texture) => {
        texture.repeat.set(0.7, 0.7);
        texture.offset.set(0.15, 0.15);
      }),
    })
  );
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color }));
  return new THREE.MeshFaceMaterial(cubeMaterialArray);
};

let filesLoaded = 0;
const updateProgress = () => {
  filesLoaded += 1;
  const progress = (filesLoaded / 6) * 100;
  document.querySelector("#begin-modal .progress-bg").style.width = `${progress}%`;
};

class MainScene extends Scene3D {
  constructor() {
    super("MainScene");
    this.speed = 4;
    this.turnSpeed = 3;
    this.isLoading = true;
    this.isLerping = true;
    this.waving = true;
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {
    const map = this.load.preload("map", "/assets/scene.gltf").then(updateProgress);
    const character = this.load.preload("character", "/assets/character.fbx").then(updateProgress);
    const idle = this.load.preload("idle", "/assets/idle.fbx").then(updateProgress);
    const walk = this.load.preload("walk", "/assets/walk.fbx").then(updateProgress);
    const run = this.load.preload("run", "/assets/run.fbx").then(updateProgress);
    const wave = this.load.preload("wave", "/assets/wave.fbx").then(updateProgress);

    await Promise.all([map, character, idle, walk, run, wave]);
  }

  async create() {
    const { lights } = await this.warpSpeed("-ground", "-grid", "-orbitControls");
    this.camera.position.set(0, 3, isMobile ? 5 : 0);
    this.camera.lookAt(new THREE.Vector3(0, 3, 10));
    const ground = this.add.plane({ width: 60, height: 60 });
    ground.rotation.x = Math.PI / 2;
    ground.position.y -= 0.1;
    ground.material.visible = false;
    this.physics.add.existing(ground, { mass: 1, collisionFlags: 2 });
    const fence1 = this.add.box({ width: 13.2, height: 2, depth: 0.5 });
    fence1.position.set(-23.5, 1, -9);
    this.physics.add.existing(fence1, { mass: 1, collisionFlags: 2 });
    const fence2 = this.add.box({ width: 26, height: 2, depth: 0.5 });
    fence2.position.set(0, 1, -9);
    this.physics.add.existing(fence2, { mass: 1, collisionFlags: 2 });
    const fence3 = this.add.box({ width: 13.2, height: 2, depth: 0.5 });
    fence3.position.set(23.5, 1, -9);
    this.physics.add.existing(fence3, { mass: 1, collisionFlags: 2 });
    const fence4 = this.add.box({ width: 0.5, height: 2, depth: 21 });
    fence4.position.set(0, 1, -20);
    this.physics.add.existing(fence4, { mass: 1, collisionFlags: 2 });

    lights.directionalLight.shadow.bias = -0.001;
    lights.directionalLight.shadow.mapSize.width = 2048;
    lights.directionalLight.shadow.mapSize.height = 2048;
    lights.directionalLight.shadow.camera.near = 0.5;
    lights.directionalLight.shadow.camera.far = 500.0;
    lights.directionalLight.shadow.camera.left = 250;
    lights.directionalLight.shadow.camera.right = -250;
    lights.directionalLight.shadow.camera.top = 250;
    lights.directionalLight.shadow.camera.bottom = -250;

    const loader = new THREE.TextureLoader();

    this.interactable = [];

    const map = (await this.load.gltf("map")).scene;
    map.scale.setScalar(3);
    this.map = new ExtendedObject3D();
    this.map.name = "map";
    this.map.add(map);
    this.map.traverse((child) => {
      if (child.isGroup) {
        if (child.name == "Center") {
          child.position.y = 0.25;
          this.physics.add.existing(child, { shape: "box", mass: 1, collisionFlags: 2, width: 11.8, height: 1, depth: 2, offset: { y: -2.3 } });
        }
        if (child.name.startsWith("Tower")) {
          child.position.y = 0.3;
          this.physics.add.existing(child, { shape: "cylinder", mass: 1, collisionFlags: 2, radius: 3.3, height: 3, offset: { y: -2 } });
          this.interactable.push(child);
        }
        if (child.name.startsWith("Level")) {
          this.physics.add.existing(child, { shape: "concave", mass: 1, collisionFlags: 2 });
        }
        if (child.name.startsWith("Project")) {
          this.physics.add.existing(child, { shape: "concave", mass: 1, collisionFlags: 2 });
          this.interactable.push(child);
        }
        if (child.name.startsWith("Board")) {
          child.position.y = 0.9;
          this.physics.add.existing(child, { shape: "box", mass: 1, collisionFlags: 2, width: 4, height: 2, depth: 25, offset: { y: -1.25 } });
          this.interactable.push(child);
        }
        if (child.name.startsWith("Chest")) {
          child.position.y = 1.2;
          this.physics.add.existing(child, { shape: "box", mass: 1, collisionFlags: 2, width: 2, height: 2, depth: 2, offset: { y: -0.75 } });
          this.interactable.push(child);
        }
      }
      if (child.isMesh) {
        if (child.name.startsWith("Board")) {
          child.position.y = child.name == "Board007" ? 0.85 : 0.4;
          this.physics.add.existing(child, { shape: "box", mass: 1, collisionFlags: 2, width: 4, height: 2, depth: 25, offset: { y: -1.15 } });
        }
        if (child.name == "Walls") {
          child.material.map = loader.load("/assets/brick.jpeg", (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 1);
          });
          this.physics.add.existing(child, { shape: "concave", mass: 1, collisionFlags: 2 });
        }
        child.castShadow = child.receiveShadow = true;
        if (child.parent.name == "Board001") if (child.name == "Cylinder001_1") child.material.map = loader.load("assets/certificates/0001.png", textureMappingCert);
        if (child.parent.name == "Board002") if (child.name == "Cylinder009_1") child.material.map = loader.load("assets/certificates/0002.png", textureMappingCert);
        if (child.parent.name == "Board003") if (child.name == "Cylinder010_1") child.material.map = loader.load("assets/certificates/0003.png", textureMappingCert);
        if (child.parent.name == "Board004") if (child.name == "Cylinder011_1") child.material.map = loader.load("assets/certificates/0004.png", textureMappingCert);
        if (child.parent.name == "Project") if (child.name == "Cube031_1") child.material.map = loader.load("assets/projects/project-1.png", textureMappingProject);
        if (child.parent.name == "Project001") if (child.name == "Cube032_1") child.material.map = loader.load("assets/projects/project-1.png", textureMappingProject);
        if (child.parent.name == "Project002") if (child.name == "Cube033_1") child.material.map = loader.load("assets/projects/project-1.png", textureMappingProject);
        if (child.parent.name == "Project003") if (child.name == "Cube034_1") child.material.map = loader.load("assets/projects/project-1.png", textureMappingProject);
        if (child.parent.name == "Project004")
          if (child.name == "Cube003_1")
            child.material.map = loader.load("/assets/github.png", (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(4, 5);
              texture.rotation = Math.PI / 2;
              texture.flipY = false;
            });
        if (child.parent.name == "Scene") {
          if (child.name == "Plane") child.material.map = loader.load("assets/companies/awign.png", textureMappingFlag);
          if (child.name == "Plane001") child.material.map = loader.load("assets/companies/tbi.png", textureMappingFlag);
          if (child.name == "Plane002") child.material.map = loader.load("assets/companies/sixerclass.jpg", textureMappingFlag);
        }
      }
    });

    const email = this.add.box({ width: 0.5, height: 0.5, depth: 0.3 });
    email.material = linkBoxMaterial(0xffffff, "assets/links/email.png", loader);
    email.position.set(-4, 0.67, 1.45);
    email.link = "mailto:shivanshnalwaya@gmail.com";
    this.interactable.push(email);

    const linkedin = this.add.box({ width: 0.5, height: 0.5, depth: 0.3 });
    linkedin.material = linkBoxMaterial(0x0078d3, "assets/links/linkedin.png", loader);
    linkedin.position.set(-2, 0.67, 1.45);
    linkedin.link = "https://www.linkedin.com/in/shivansh-nalwaya/";
    this.interactable.push(linkedin);

    const github = this.add.box({ width: 0.5, height: 0.5, depth: 0.3 });
    github.material = linkBoxMaterial(0x000000, "assets/links/github.png", loader);
    github.position.set(0, 0.67, 1.45);
    github.link = "https://github.com/shivansh-nalwaya";
    this.interactable.push(github);

    const facebook = this.add.box({ width: 0.5, height: 0.5, depth: 0.3 });
    facebook.material = linkBoxMaterial(0x3f51b5, "assets/links/facebook.png", loader);
    facebook.position.set(2, 0.67, 1.45);
    facebook.link = "https://www.facebook.com/shivansh.nalwaya";
    this.interactable.push(facebook);

    const insta = this.add.box({ width: 0.5, height: 0.5, depth: 0.3 });
    insta.material = linkBoxMaterial(0xf55376, "assets/links/insta.png", loader);
    insta.position.set(4, 0.67, 1.45);
    insta.link = "https://www.instagram.com/shivanshnalwaya";
    this.interactable.push(insta);

    this.add.existing(this.map);

    const man = await this.load.fbx("character");

    const manAnims = new AnimationMixer(man);
    this.animationMixers.add(manAnims);

    const idle = await this.load.fbx("idle");
    this.manIdleAction = manAnims.clipAction(idle.animations[0]);

    const walk = await this.load.fbx("walk");
    this.manWalkAction = manAnims.clipAction(walk.animations[0]);

    const run = await this.load.fbx("run");
    this.manRunAction = manAnims.clipAction(run.animations[0]);

    const wave = await this.load.fbx("wave");
    this.manWaveAction = manAnims.clipAction(wave.animations[0]);

    this.actions = {
      wave: this.manWaveAction,
      walk: this.manWalkAction,
      idle: this.manIdleAction,
      run: this.manRunAction,
    };

    man.scale.setScalar(0.012);
    man.rotateY(Math.PI);

    this.man = new ExtendedObject3D();
    this.man.name = "man";
    this.man.add(man);
    this.man.position.set(0, 0, isMobile ? 18 : 8);
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

    window.beginJourney = () => {
      document.getElementById("begin-modal").style.display = "none";
      new TWEEN.Tween(this.camera.position)
        .to(
          {
            x: 0,
            y: isMobile ? 2.3 * 1.5 : 3,
            z: 8 + (isMobile ? 11.5 : 7),
          },
          1000
        )
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(() => {
          this.camera.lookAt(new Vector3(0, 2, 8));
        })
        .onComplete(() => {
          this.camera.lookAt(new Vector3(0, 2, 8));
          this.isLerping = false;
          if (isTouchDevice) {
            const joystick = new JoyStick();
            const axis = joystick.add.axis({
              styles: { right: 1.5 * rem, bottom: rem, size: 100 },
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
          } else document.getElementById("msg").style.display = "flex";
          document.getElementById("map").style.display = "block";
          document.getElementById("pointer").style.display = "block";
        })
        .start();
    };

    const onClick = (event) => {
      if (this.isLerping) return;
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.interactable);
      if (intersects[0].object.link) return window.open(intersects[0].object.link);
      if (intersects[0].object.parent.userData.link) return window.open(intersects[0].object.parent.userData.link);
      if (intersects.length > 0 && intersects[0].object.parent.visible) {
        this.isLerping = true;
        const oldPosition = this.camera.position.clone(),
          oldLookAt = tempVector.clone();
        window.onCloseModal = () => {
          document.getElementById("modal").classList.remove("visible");
          new TWEEN.Tween(this.camera.position)
            .to(
              {
                x: oldPosition.x,
                y: oldPosition.y,
                z: oldPosition.z,
              },
              1000
            )
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onUpdate(() => {
              this.camera.lookAt(tempVector);
            })
            .onComplete(() => {
              this.camera.lookAt(...oldLookAt);
              this.isLerping = false;
            })
            .start();
          new TWEEN.Tween(tempVector)
            .to({
              x: oldLookAt.x,
              y: oldLookAt.y,
              z: oldLookAt.z,
            })
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onComplete(() => {
              this.camera.lookAt(...oldLookAt);
              this.isLerping = false;
            })
            .start();
        };
        document.getElementById("msg").style.display = "none";
        const parent = intersects[0].object.parent;
        document.getElementById("modal").classList.add("visible");
        document.getElementById("modal-content").innerHTML = content[parent.userData.name] || "";
        new TWEEN.Tween(this.camera.position)
          .to(
            {
              x: parent.position.x * 3 + parent.userData.cameraOffset.x * (isMobile ? parent.userData.mobileOffsetFactor : 1),
              y: parent.position.y * 3 + parent.userData.cameraOffset.y,
              z: parent.position.z * 3 + parent.userData.cameraOffset.z * (isMobile ? parent.userData.mobileOffsetFactor : 1),
            },
            1000
          )
          .easing(TWEEN.Easing.Sinusoidal.InOut)
          .onUpdate(() => {
            this.camera.lookAt(tempVector);
          })
          .onComplete(() => {
            this.camera.lookAt(
              new Vector3(
                parent.position.x * 3 + parent.userData.targetOffset.x,
                parent.position.y * 3 + parent.userData.targetOffset.y,
                parent.position.z * 3 + parent.userData.targetOffset.z
              )
            );
          })
          .start();
        new TWEEN.Tween(tempVector)
          .to({
            x: parent.position.x * 3 + parent.userData.targetOffset.x,
            y: parent.position.y * 3 + parent.userData.targetOffset.y,
            z: parent.position.z * 3 + parent.userData.targetOffset.z,
          })
          .easing(TWEEN.Easing.Sinusoidal.InOut)
          .onComplete(() => {
            this.camera.lookAt(
              new Vector3(
                parent.position.x * 3 + parent.userData.targetOffset.x,
                parent.position.y * 3 + parent.userData.targetOffset.y,
                parent.position.z * 3 + parent.userData.targetOffset.z
              )
            );
            document.getElementById("modal").classList.add("visible");
          })
          .start();
      }
    };

    const onMouseMove = (event) => {
      if (this.isLerping) return;
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.interactable);
      if (intersects.length > 0 && intersects[0].object.parent.visible) {
        document.querySelector("body").style.cursor = "pointer";
      } else {
        document.querySelector("body").style.cursor = "default";
      }
    };

    document.addEventListener("keydown", (e) => press(e, true));
    document.addEventListener("keyup", (e) => press(e, false));
    document.addEventListener("mousemove", (e) => onMouseMove(e));
    document.addEventListener("click", (e) => onClick(e));
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
    if (this.isLoading) {
      document.querySelector("#begin-modal button").classList.add("loaded");
      document.querySelector("#begin-modal button").innerHTML = "Begin Journey";
      document.querySelector("canvas").style.opacity = "1";
      this.isLoading = false;
    }
    if (this.waving) {
      this.fadeToAction("idle", 0.5);
      setTimeout(() => {
        this.waveStarted = true;
        this.fadeToAction("wave", 0.5);
      }, 1000);
      this.waving = false;
      return;
    }
    if (this.waveStarted) {
      this.fadeToAction("wave", 0.5);
      setTimeout(() => {
        this.fadeToAction("idle", 0.5);
      }, 2000);
      this.waveStarted = false;
      return;
    }
    if (this.isLerping) return TWEEN.update();
    if (this.keys.left.isDown) this.man.body.setAngularVelocityY(this.turnSpeed);
    else if (this.keys.right.isDown) this.man.body.setAngularVelocityY(-this.turnSpeed);
    else this.man.body.setAngularVelocityY(0);
    if (this.keys.up.isDown) {
      this.man.body.setVelocityZ(Math.cos(this.man.body.rotation.y) * -this.speed);
      this.man.body.setVelocityX(Math.sin(this.man.body.rotation.y) * -this.speed);
    }
    if (this.keys.up.isDown) {
      document.getElementById("pointer").style.bottom = 4 - this.man.position.z / 9 + "rem";
      document.getElementById("pointer").style.left = 4 + this.man.position.x / 9 + "rem";
      document.querySelector("body").style.cursor = "none";
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
    this.camera.position.y += 1.5 * (isMobile ? 2.3 : 2);
    tempVector.copy(this.man.body.position).y += 2;
    this.camera.lookAt(tempVector);

    const dir = new THREE.Vector3(this.man.body.position.x, this.man.body.position.y - (isMobile ? 1 : 2), this.man.body.position.z).sub(this.camera.position).normalize();
    obstruct.set(this.camera.position, dir);

    let minToEmission = null,
      minDist = 21;
    this.map.traverse((child) => {
      if (child.isGroup && child.userData.hideable == 1) {
        const obstructions = obstruct.intersectObject(child);
        child.visible = obstructions.length == 0;
      }
    });
    if (this.keys.up.isDown) {
      this.map.traverse((child) => {
        if (child.isGroup && child.userData.hideable == 1) {
          const obstructions = obstruct.intersectObject(child);
          child.visible = obstructions.length == 0;
        }
        if (child.isMesh && child.parent.userData.emissive == 1 && child.parent.visible) {
          var point1 = new Vector3(),
            point2 = new Vector3();
          point1.setFromMatrixPosition(this.man.matrixWorld);
          point2.setFromMatrixPosition(child.matrixWorld);
          var distance = point1.distanceTo(point2);
          if (distance < 6) {
            if (distance < minDist) {
              minDist = distance;
              minToEmission = child;
            }
          }
        }
      });
      if (minToEmission) {
        document.getElementById("msg").style.display = "flex";
        document.getElementById("msg-content").innerHTML = minToEmission.parent.userData.cta;
      } else {
        document.getElementById("msg").style.display = "none";
      }
    }
  }
}

const config = { scenes: [MainScene], antialias: true };

PhysicsLoader("/lib", () => new Project(config));
