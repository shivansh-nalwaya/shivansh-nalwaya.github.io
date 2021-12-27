import * as CANNON from "cannon-es";
import * as THREE from "three";
import CannonDebugRenderer from "../utils/cdr";
import isDev from "../utils/is-dev";
import Character from "../models/character";
import scene from "../scene";
import Loaders from "../loaders";

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -10, 0),
});
world.solver.iterations = 10;

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
world.addBody(groundBody);

// const normalMaterial = new THREE.MeshNormalMaterial();
// const cubeGeometry = new THREE.BoxGeometry(10, 1, 2);
// const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial);
// cubeMesh.position.y = 0.5;
// cubeMesh.position.z = 45;
// cubeMesh.castShadow = true;
// scene.add(cubeMesh);

// const cubeGeometry2 = new THREE.BoxGeometry(10, 2, 2);
// const cubeMesh2 = new THREE.Mesh(cubeGeometry2, normalMaterial);
// cubeMesh2.position.y = 1;
// cubeMesh2.position.z = 43;
// cubeMesh2.castShadow = true;
// scene.add(cubeMesh2);

// const cubeGeometry3 = new THREE.BoxGeometry(10, 3, 20.8);
// const cubeMesh3 = new THREE.Mesh(cubeGeometry3, normalMaterial);
// cubeMesh3.position.y = 1.5;
// cubeMesh3.position.z = 32;
// cubeMesh3.castShadow = true;
// scene.add(cubeMesh3);

// const stairShape = new CANNON.Box(new CANNON.Vec3(5, 10, 10));
// const stairBody = new CANNON.Body({ mass: 0, shape: stairShape });
// stairBody.position = new CANNON.Vec3(0, -11, 44);
// stairBody.quaternion = new CANNON.Quaternion(0, 0, 0, 0).setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 5);
// world.addBody(stairBody);

// const elevationShape = new CANNON.Box(new CANNON.Vec3(5, 3, 10));
// const elevationBody = new CANNON.Body({ mass: 0, shape: elevationShape });
// elevationBody.position = new CANNON.Vec3(0, 0, 31.6);
// world.addBody(elevationBody);

// var w = 400,
//   h = 400;
// var hfdata = [];
// for (let i = 0; i < w; i++) {
//   var data = [];
//   for (let j = 0; j < h; j++) {
//     const dataPoint = 10 + -10 * Math.sin((i / 400) * Math.PI) * Math.sin((j / 400) * Math.PI);
//     data.push(dataPoint);
//   }
//   hfdata.push(data);
// }
// const heightfieldShape = new CANNON.Heightfield(hfdata, {
//   elementSize: 1,
//   minValue: -10,
//   maxValue: 10,
// });
// const heightfieldBody = new CANNON.Body({ shape: heightfieldShape, mass: 0 });
// heightfieldBody.position = new CANNON.Vec3(-200, -5, 200);
// heightfieldBody.quaternion = new CANNON.Quaternion(0, 0, 0, 0).setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
// world.addBody(heightfieldBody);

// const geometry = new THREE.PlaneBufferGeometry(400, 400, 256, 256);
// const count = geometry.attributes.position.count;
// for (var i = 0; i < count; i++) {
//   const x = geometry.attributes.position.getX(i) + 200;
//   const y = geometry.attributes.position.getY(i) + 200;
//   const xsin = Math.sin((x / 400) * Math.PI);
//   const ysin = Math.sin((y / 400) * Math.PI);
//   geometry.attributes.position.setZ(i, 10 + -10 * xsin * ysin);
// }

// const material = new THREE.MeshStandardMaterial({ color: 0x22350e });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.receiveShadow = true;
// mesh.castShadow = true;
// mesh.rotation.set(-Math.PI / 2, 0, 0);
// mesh.position.set(0, -5, 0);
// scene.add(mesh);

export const shape = new CANNON.Box(new CANNON.Vec3(2, 5.5, 2));
export const characterBody = new CANNON.Body({ mass: 60, shape, angularDamping: 1 });
characterBody.position.copy(Character.position);
characterBody.quaternion.copy(Character.quaternion);
world.addBody(characterBody);

export const cannonDebugRenderer = isDev ? new CannonDebugRenderer(scene, world) : null;

export default world;
