import { Box, Body, Vec3 } from "cannon-es";
import Loaders from "../loaders";
import world from "../physics";
import scene from "../scene";

const Character = await Loaders.FBXLoader.loadAsync("/assets/models/character.fbx");

Character.scale.setScalar(0.07);
Character.rotation.set(0, Math.PI, 0);
Character.position.set(0, 5.5, 60);
Character.traverse((c) => {
  c.castShadow = true;
});

scene.add(Character);

const shape = new Box(new Vec3(2, 5.5, 2));
export const characterBody = new Body({ mass: 60, shape, angularDamping: 1 });
characterBody.position.copy(Character.position);
characterBody.quaternion.copy(Character.quaternion);
world.addBody(characterBody);

export default Character;
