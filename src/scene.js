import * as THREE from "three";
import Loaders from "./loaders";

const scene = new THREE.Scene();

scene.background = Loaders.TextureLoader.load("/assets/images/sky-bg.jpeg");

export default scene;
