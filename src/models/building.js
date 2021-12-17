import Loaders from "../loaders";
import scene from "../scene";

const Building = await Loaders.GLTFLoader.loadAsync("/assets/models/candy_shop/scene.gltf");

Building.scene.scale.setScalar(8);
Building.scene.rotation.set(0, -Math.PI / 2, 0);
Building.scene.position.set(0, 0, -20);
Building.scene.traverse((c) => {
  c.castShadow = true;
});

scene.add(Building.scene);

export default Building;
