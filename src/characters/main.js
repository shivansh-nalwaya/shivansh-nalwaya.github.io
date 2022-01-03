import { Vector3, Raycaster, AnimationMixer } from "three";
import camera from "../camera";
import Loaders from "../loaders";
import scene from "../scene";
import Models from "../models";

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
  rayPos = new Vector3();
let walkSpeed = 0.4;

Main.customAnimation = (t) => {
  rayPos.set(Main.position.x, 100, Main.position.z);
  var rayDir = new Vector3(0, -1, 0);

  ray.set(rayPos, rayDir);
  models.forEach((model) => {
    let intersect = ray.intersectObject(model);
    if (Object.keys(intersect).length > 0) {
      if (model.climbable) {
        const y = intersect[0].point.y;
        Main.position.setY(y);
      } else {
        walkSpeed = 0;
        const vec = intersect[0].face.normal;
        if (Math.abs(vec.x) > Math.abs(vec.z)) Main.position.x += vec.x;
        else Main.position.z += vec.z;
      }
    } else {
      walkSpeed = 0.4;
    }
  });

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