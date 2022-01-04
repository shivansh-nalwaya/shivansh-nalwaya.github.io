import { Vector3, Raycaster, AnimationMixer, Box3, Box3Helper } from "three";
import camera from "../camera";
import Loaders from "../loaders";
import scene from "../scene";
import Models from "../models";
import Ground from "../shapes/ground";

const models = Object.values(Models());

const Main = await Loaders.FBXLoader.loadAsync("/assets/models/character.fbx");

Main.scale.setScalar(0.07);
Main.rotation.set(0, Math.PI, 0);
Main.position.set(0, 0, 60);
Main.traverse((c) => {
  c.castShadow = true;
});

const idle = await Loaders.AnimationLoader.loadAsync("/assets/animations/idle.fbx");

const MainIdle = new AnimationMixer(Main);

export const MainIdleAction = MainIdle.clipAction(idle.animations[0]);
MainIdleAction.play();

const walk = await Loaders.AnimationLoader.loadAsync("/assets/animations/walk.fbx");

const MainWalk = new AnimationMixer(Main);

export const MainWalkAction = MainWalk.clipAction(walk.animations[0]);
MainWalkAction.play();

const tempVector = new Vector3(),
  ray = new Raycaster(),
  ray2 = new Raycaster(),
  ray3 = new Raycaster(),
  ray4 = new Raycaster();
let walkSpeed = 0.4;

Main.customAnimation = (t) => {
  ray.set(new Vector3(Main.position.x + 1.8, 100, Main.position.z + 1.8), new Vector3(0, -1, 0));
  ray2.set(new Vector3(Main.position.x - 1.8, 100, Main.position.z + 1.8), new Vector3(0, -1, 0));
  ray3.set(new Vector3(Main.position.x + 1.8, 100, Main.position.z - 1.8), new Vector3(0, -1, 0));
  ray4.set(new Vector3(Main.position.x - 1.8, 100, Main.position.z - 1.8), new Vector3(0, -1, 0));

  let intersect = ray.intersectObjects(models);
  if (intersect.length == 0) intersect = ray2.intersectObjects(models);
  if (intersect.length == 0) intersect = ray3.intersectObjects(models);
  if (intersect.length == 0) intersect = ray4.intersectObjects(models);
  if (intersect.length > 0) {
    walkSpeed = 0;
    const vec = intersect[0].face.normal;
    if (Math.abs(vec.x) > Math.abs(vec.z)) Main.position.x += vec.x * 0.1;
    else Main.position.z += vec.z * 0.1;
  } else {
    walkSpeed = 0.4;
  }

  let intersect2 = ray.intersectObject(Ground);
  if (intersect2.length > 0) {
    const y = intersect2[0].point.y < -2 ? -2 : intersect2[0].point.y;
    if (y == -2) walkSpeed = 0.2;
    Main.position.setY(y);
  }

  if (Main.walkForward) {
    Main.translateZ(walkSpeed);
  }
  if (Main.turnLeft) {
    Main.rotation.y += 0.05;
    if (!Main.walkBackward && !Main.walkForward) Main.translateZ(walkSpeed);
  }
  if (Main.turnRight) {
    Main.rotation.y -= 0.05;
    if (!Main.walkBackward && !Main.walkForward) Main.translateZ(walkSpeed);
  }
  if (!Main.walkForward && !Main.turnLeft && !Main.turnRight) {
    MainIdle.update(t);
  } else {
    MainWalk.update(t);
    camera.position.copy(Main.position);
    camera.position.x -= Math.sin(Main.rotation.y) * 20;
    camera.position.z -= Math.cos(Main.rotation.y) * 20;
    camera.position.y += 10;
    tempVector.copy(Main.position).y += 10;
    camera.lookAt(tempVector);
  }
};

scene.add(Main);

export default Main;
