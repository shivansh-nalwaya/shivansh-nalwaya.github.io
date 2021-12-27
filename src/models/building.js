import * as THREE from "three";
import Loaders from "../loaders";
import scene from "../scene";

const Tree = await Loaders.GLTFLoader.loadAsync("/assets/models/tree-2/scene.gltf");

Tree.scene.scale.setScalar(10);
Tree.scene.rotation.set(0, -Math.PI / 2, 0);
Tree.scene.position.set(0, -2, 0);
Tree.scene.traverse((c) => {
  c.castShadow = true;
  if (c.isMesh) {
    if (c.material.name == "Material_001") c.material.color = new THREE.Color(0x1e4407);
    else c.material.color = new THREE.Color(0x3a1705);
  }
});

const onBoundary = 20,
  w = 400,
  h = 400;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < onBoundary; j++) {
    const tree = Tree.scene.clone();
    if (i == 0) {
      if (j < onBoundary - 2) tree.position.set(-180, -2, (j + 1 - onBoundary / 2) * (h / onBoundary));
    }
    if (i == 1) {
      if (j < onBoundary - 2) tree.position.set(180, -2, (j + 1 - onBoundary / 2) * (h / onBoundary));
    }
    if (i == 2) {
      if (j < onBoundary - 2) tree.position.set((j + 2 - onBoundary / 2) * (w / onBoundary), -2, 170);
    }
    if (i == 3) {
      if (j < onBoundary - 2) tree.position.set((j + 2 - onBoundary / 2) * (w / onBoundary), -2, -190);
    }
    scene.add(tree);
  }
}

export default Tree;
