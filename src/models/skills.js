import Loaders from "../loaders";
import scene from "../scene";

const python = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

python.scale.setScalar(0.5);
python.position.set(-20, 0, -30);
python.rotation.set(0, 0, Math.PI / 2);
python.traverse((c) => {
  c.castShadow = true;
});
scene.add(python);

export default python;
