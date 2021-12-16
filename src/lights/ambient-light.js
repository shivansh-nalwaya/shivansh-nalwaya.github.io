import * as THREE from "three";
import scene from "../scene";

let Light = new THREE.AmbientLight(0xffffff);

scene.add(Light);

export default Light;