import * as THREE from "three";
import Loaders from "../loaders";
import scene from "../scene";

const Tree1 = await Loaders.GLTFLoader.loadAsync("/assets/models/tree-1/scene.gltf");

Tree1.scene.scale.setScalar(0.06);
Tree1.scene.rotation.set(0, -Math.PI / 2, 0);
Tree1.scene.position.set(0, 0, 0);
Tree1.scene.traverse((c) => {
  c.castShadow = true;
});

scene.add(Tree1.scene);

const Tree2 = await Loaders.GLTFLoader.loadAsync("/assets/models/tree-2/scene.gltf");

Tree2.scene.scale.setScalar(10);
Tree2.scene.rotation.set(0, -Math.PI / 2, 0);
Tree2.scene.position.set(0, -2, 10);
Tree2.scene.traverse((c) => {
  c.castShadow = true;
  if (c.isMesh) {
    if (c.material.name == "Material_001") c.material.color = new THREE.Color(0x1e4407);
    else c.material.color = new THREE.Color(0x3a1705);
  }
});

scene.add(Tree2.scene);

const Tree4 = await Loaders.GLTFLoader.loadAsync("/assets/models/tree-4/scene.gltf");

Tree4.scene.scale.setScalar(1);
Tree4.scene.rotation.set(0, -Math.PI / 2, 0);
Tree4.scene.position.set(-50, 0, 10);
Tree4.scene.traverse((c) => {
  c.castShadow = true;
  if (c.isMesh) {
    console.log(c.material.name);
    if (c.material.name == "tree_wood") c.material.color = new THREE.Color(0x3a1705);
    // else c.material.color = new THREE.Color(0x3a1705);
  }
});

scene.add(Tree4.scene);

export default Tree1;
