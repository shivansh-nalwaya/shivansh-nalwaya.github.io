import * as THREE from "three";
import Loaders from "../loaders";
import scene from "../scene";

const Building = await Loaders.GLTFLoader.loadAsync("/assets/models/castle-1/scene.gltf");

Building.scene.scale.setScalar(4);
Building.scene.rotation.set(0, Math.PI, 0);
Building.scene.position.set(0, 0, -20);
Building.scene.traverse((c) => {
  c.castShadow = true;
});

scene.add(Building.scene);

const Building2 = await Loaders.GLTFLoader.loadAsync("/assets/models/tower/scene.gltf");

Building2.scene.scale.setScalar(2);
Building2.scene.rotation.set(0, -Math.PI / 2, 0);
Building2.scene.position.set(-60, -2, 18);
Building2.scene.traverse((c) => {
  c.castShadow = true;
});

scene.add(Building2.scene);

const Building3 = await Loaders.GLTFLoader.loadAsync("/assets/models/tower-2/scene.gltf");

Building3.scene.scale.setScalar(0.02);
Building3.scene.rotation.set(0, -Math.PI / 2, 0);
Building3.scene.position.set(60, 0, 18);
Building3.scene.traverse((c) => {
  c.castShadow = true;
});

scene.add(Building3.scene);

const Building4 = await Loaders.GLTFLoader.loadAsync("/assets/models/warehouse/scene.gltf");

Building4.scene.scale.setScalar(20);
// Building4.scene.rotation.set(0, -Math.PI / 2, 0);
Building4.scene.position.set(-80, 20, 50);
Building4.scene.traverse((c) => {
  c.castShadow = true;
});

scene.add(Building4.scene);

export default Building;
