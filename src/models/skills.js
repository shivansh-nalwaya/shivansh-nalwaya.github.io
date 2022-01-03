import Loaders from "../loaders";
import scene from "../scene";

const python = await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf");

python.scene.scale.setScalar(0.5);
python.scene.position.set(-20, 0, -30);
python.scene.rotation.set(0, 0, Math.PI / 2);
python.scene.traverse((c) => {
  c.castShadow = true;
});
scene.add(python.scene);

export default python;
