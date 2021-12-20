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
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
export const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial);
cubeMesh.position.y = 5;
cubeMesh.position.z = 45;
cubeMesh.castShadow = true;
scene.add(cubeMesh);
const cubeShape = new CANNON.Box(new CANNON.Vec3(5, 5, 5));
export const cubeBody = new CANNON.Body({ mass: 0 });
cubeBody.addShape(cubeShape);
cubeBody.position.copy(cubeMesh.position);
cubeBody.quaternion.copy(cubeMesh.quaternion);
world.addBody(cubeBody);

export const characterBody = new CANNON.Body({ mass: 60, shape: new CANNON.Box(new CANNON.Vec3(2, 5.5, 4)), angularDamping: 1 });
characterBody.position.copy(Character.position);
characterBody.quaternion.copy(Character.quaternion);
world.addBody(characterBody);

export const cannonDebugRenderer = isDev ? new CannonDebugRenderer(scene, world) : null;

export default world;
