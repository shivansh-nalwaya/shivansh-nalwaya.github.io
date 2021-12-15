import Loaders from "../loaders";
import scene from "../scene";

const Character = await Loaders.FBXLoader.loadAsync("/assets/models/character.fbx");

Character.scale.setScalar(0.07);
Character.rotation.set(0, 0, 0);
Character.position.set(0, 0, 50);
Character.traverse((c) => {
  c.castShadow = true;
});

scene.add(Character);

export default Character;
