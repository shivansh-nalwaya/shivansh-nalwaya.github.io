import * as THREE from "three";
import scene from "../scene";

let Light = new THREE.DirectionalLight(0xffffff, 1.0);

Light.position.set(100, 200, 10);
Light.target.position.set(0, 0, 0);
Light.castShadow = true;
Light.shadow.bias = -0.001;
Light.shadow.mapSize.width = 2048;
Light.shadow.mapSize.height = 2048;
Light.shadow.camera.near = 0.1;
Light.shadow.camera.far = 500.0;
Light.shadow.camera.near = 0.5;
Light.shadow.camera.far = 500.0;
Light.shadow.camera.left = 250;
Light.shadow.camera.right = -250;
Light.shadow.camera.top = 250;
Light.shadow.camera.bottom = -250;

scene.add(Light);

export default Light;
