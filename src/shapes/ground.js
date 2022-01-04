import { CircleGeometry, MeshLambertMaterial, MeshStandardMaterial, Mesh, PlaneGeometry, BoxGeometry } from "three";
import scene from "../scene";
import Loaders from "../loaders";

const Ground = (await Loaders.GLTFLoader.loadAsync("/assets/models/untitled.gltf")).scene;
Ground.traverse((c) => {
  c.castShadow = true;
  c.receiveShadow = true;
});
Ground.receiveShadow = true;

scene.add(Ground);

export default Ground;
