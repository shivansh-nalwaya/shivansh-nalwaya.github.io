import * as THREE from "three";
import scene from "../scene";

const Light = new THREE.HemisphereLight(0xffffff, 0x444444);
Light.position.set(0, 200, 0);
scene.add(Light);

const Light2 = new THREE.SpotLight(0xffffff, 5, 0, 1);
Light2.castShadow = true;
Light2.position.set(0, 50, 250);
const targetObject = new THREE.Object3D();
targetObject.position.set(0, 0, 250);
targetObject.updateMatrixWorld();
Light2.target = targetObject;

scene.add(Light2);
scene.add(targetObject);

export default Light2;
