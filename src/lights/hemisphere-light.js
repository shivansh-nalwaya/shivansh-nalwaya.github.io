import * as THREE from "three";
import scene from "../scene";

const Light = new THREE.HemisphereLight(0xffffff, 0x444444);
Light.position.set(0, 200, 0);
scene.add(Light);

export default Light;
