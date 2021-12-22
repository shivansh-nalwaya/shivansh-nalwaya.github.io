import * as CANNON from "cannon-es";
import * as THREE from "three";
import CannonDebugRenderer from "../utils/cdr";
import isDev from "../utils/is-dev";
import Character from "../models/character";
import scene from "../scene";

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

const normalMaterial = new THREE.MeshNormalMaterial();
const cubeGeometry = new THREE.BoxGeometry(10, 1, 2);
const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial);
cubeMesh.position.y = 0.5;
cubeMesh.position.z = 45;
cubeMesh.castShadow = true;
scene.add(cubeMesh);

const cubeGeometry2 = new THREE.BoxGeometry(10, 2, 2);
const cubeMesh2 = new THREE.Mesh(cubeGeometry2, normalMaterial);
cubeMesh2.position.y = 1;
cubeMesh2.position.z = 43;
cubeMesh2.castShadow = true;
scene.add(cubeMesh2);

const cubeGeometry3 = new THREE.BoxGeometry(10, 3, 2);
const cubeMesh3 = new THREE.Mesh(cubeGeometry3, normalMaterial);
cubeMesh3.position.y = 1.5;
cubeMesh3.position.z = 41;
cubeMesh3.castShadow = true;
scene.add(cubeMesh3);

const trimeshShape = new CANNON.Box(new CANNON.Vec3(5, 10, 10));
const trimeshBody = new CANNON.Body({ mass: 0, shape: trimeshShape });
trimeshBody.position = new CANNON.Vec3(0, -10.5, 44);
trimeshBody.quaternion = new CANNON.Quaternion(0, 0, 0, 0).setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 5);
world.addBody(trimeshBody);

export const shape = new CANNON.Box(new CANNON.Vec3(2, 5.5, 2));
export const characterBody = new CANNON.Body({ mass: 60, shape, angularDamping: 1 });
characterBody.position.copy(Character.position);
characterBody.quaternion.copy(Character.quaternion);
world.addBody(characterBody);

export const cannonDebugRenderer = isDev ? new CannonDebugRenderer(scene, world) : null;

export default world;
