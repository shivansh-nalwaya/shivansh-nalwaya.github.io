import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import start from "./src";

// class BasicCharacterControls {
//   constructor(params) {
//     this._Init(params);
//   }

//   _Init(params) {
//     this._params = params;
//     this._move = {
//       forward: false,
//       backward: false,
//       left: false,
//       right: false,
//     };
//     this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -10.0);
//     this._acceleration = new THREE.Vector3(1, 1, 60.0);
//     this._velocity = new THREE.Vector3(0, 0, 0);

//     document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
//     document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
//   }

//   _onKeyDown(event) {
//     switch (event.keyCode) {
//       case 38:
//       case 87: // w
//         this._move.forward = true;
//         break;
//       case 37: // left
//       case 65: // a
//         this._move.left = true;
//         break;
//       // case 40: // down
//       // case 83: // s
//       //   this._move.backward = true;
//       //   break;
//       case 39: // right
//       case 68: // d
//         this._move.right = true;
//         break;
//     }
//   }

//   _onKeyUp(event) {
//     switch (event.keyCode) {
//       case 38: // up
//       case 87: // w
//         this._move.forward = false;
//         break;
//       case 37: // left
//       case 65: // a
//         this._move.left = false;
//         break;
//       // case 40: // down
//       // case 83: // s
//       //   this._move.backward = false;
//       //   break;
//       case 39: // right
//       case 68: // d
//         this._move.right = false;
//         break;
//     }
//   }

//   Update(timeInSeconds) {
//     const velocity = this._velocity;
//     const frameDecceleration = new THREE.Vector3(velocity.x * this._decceleration.x, velocity.y * this._decceleration.y, velocity.z * this._decceleration.z);
//     frameDecceleration.multiplyScalar(timeInSeconds);
//     frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

//     velocity.add(frameDecceleration);

//     const controlObject = this._params.target;
//     const _Q = new THREE.Quaternion();
//     const _A = new THREE.Vector3();
//     const _R = controlObject.quaternion.clone();

//     if (this._move.forward) {
//       velocity.z += this._acceleration.z * timeInSeconds;
//       this._params.camera.position.z -= this._acceleration.z * timeInSeconds * 0.1;
//     }
//     if (this._move.backward) {
//       velocity.z -= this._acceleration.z * timeInSeconds;
//     }
//     if (this._move.left) {
//       _A.set(0, 1, 0);
//       _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
//       _R.multiply(_Q);
//       this._params.camera.position.x += timeInSeconds * 5;
//     }
//     if (this._move.right) {
//       _A.set(0, 1, 0);
//       _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
//       _R.multiply(_Q);
//     }
//     // this._params.walk.play();

//     if (this._move.forward || this._move.backward || this._move.left || this._move.right) {
//       this._params.idle.enabled = false;
//       this._params.walk.enabled = true;
//     } else {
//       this._params.walk.enabled = false;
//       this._params.idle.enabled = true;
//     }

//     controlObject.quaternion.copy(_R);

//     const oldPosition = new THREE.Vector3();
//     oldPosition.copy(controlObject.position);

//     const forward = new THREE.Vector3(0, 0, 1);
//     forward.applyQuaternion(controlObject.quaternion);
//     forward.normalize();

//     const sideways = new THREE.Vector3(1, 0, 0);
//     sideways.applyQuaternion(controlObject.quaternion);
//     sideways.normalize();

//     sideways.multiplyScalar(velocity.x * timeInSeconds);
//     forward.multiplyScalar(velocity.z * timeInSeconds);

//     controlObject.position.add(forward);
//     controlObject.position.add(sideways);

//     oldPosition.copy(controlObject.position);
//   }
// }

// const loader = new THREE.TextureLoader();

// const scene = new THREE.Scene();

// const mixers = [];

// scene.background = loader.load("/assets/images/sky-bg.jpeg");

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector("#app"),
// });

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.setZ(30);
// camera.position.setY(10);

// renderer.render(scene, camera);

// const geometry = new THREE.PlaneGeometry(200, 200);
// var texture = loader.load("/assets/images/grass-texture.jpeg", function (texture) {
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   texture.offset.set(0, 0);
//   texture.repeat.set(10, 10);
// });
// const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, map: texture });
// const plane = new THREE.Mesh(geometry, material);
// plane.rotateX(Math.PI / 2);
// plane.receiveShadow = true;
// scene.add(plane);

// let walk, idle, charControls;

// const fbxloader = new FBXLoader();
// const animLoader = new FBXLoader();
// fbxloader.load("/assets/models/character.fbx", (fbx) => {
//   fbx.scale.setScalar(0.07);
//   fbx.rotation.set(0, Math.PI, 0);
//   fbx.position.set(0, 0, 20);
//   fbx.traverse((c) => {
//     c.castShadow = true;
//   });

//   animLoader.load("/assets/animations/walk.fbx", (anim) => {
//     const m = new THREE.AnimationMixer(fbx);
//     mixers.push(m);
//     walk = m.clipAction(anim.animations[0]);
//     walk.play();
//     animLoader.load("/assets/animations/idle.fbx", (anim) => {
//       const m = new THREE.AnimationMixer(fbx);
//       mixers.push(m);
//       idle = m.clipAction(anim.animations[0]);
//       idle.play();
//       const params = {
//         target: fbx,
//         camera,
//         walk,
//         idle,
//       };
//       charControls = new BasicCharacterControls(params);
//     });
//   });

//   scene.add(fbx);
// });

// let light = new THREE.DirectionalLight(0xfdfbd3, 1.0);
// light.position.set(20, 100, 10);
// light.target.position.set(0, 0, 0);
// light.castShadow = true;
// light.shadow.bias = -0.001;
// light.shadow.mapSize.width = 2048;
// light.shadow.mapSize.height = 2048;
// light.shadow.camera.near = 0.1;
// light.shadow.camera.far = 500.0;
// light.shadow.camera.near = 0.5;
// light.shadow.camera.far = 500.0;
// light.shadow.camera.left = 100;
// light.shadow.camera.right = -100;
// light.shadow.camera.top = 100;
// light.shadow.camera.bottom = -100;
// scene.add(light);

// const ambientLight = new THREE.AmbientLight(0xfdfbd3);
// scene.add(ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);
// let previousRAF;
// function animate() {
//   requestAnimationFrame((t) => {
//     if (previousRAF === null) {
//       previousRAF = t;
//     }

//     animate();

//     if (mixers) mixers.map((m) => m.update((t - previousRAF) * 0.001));
//     if (charControls) charControls.Update((t - previousRAF) * 0.001);

//     previousRAF = t;
//   });
//   controls.update();
//   renderer.render(scene, camera);
// }

// animate();

start();
