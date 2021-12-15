import * as THREE from "three";
import scene from "../scene";

let Light = new THREE.DirectionalLight(0xfdfbd3, 1.0);

Light.position.set(20, 20, 10);
Light.target.position.set(0, 0, 0);
Light.castShadow = true;
Light.shadow.bias = -0.001;
Light.shadow.mapSize.width = 2048;
Light.shadow.mapSize.height = 2048;
Light.shadow.camera.near = 0.1;
Light.shadow.camera.far = 500.0;
Light.shadow.camera.near = 0.5;
Light.shadow.camera.far = 500.0;
Light.shadow.camera.left = 100;
Light.shadow.camera.right = -100;
Light.shadow.camera.top = 100;
Light.shadow.camera.bottom = -100;

scene.add(Light);

export default Light;
