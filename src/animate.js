import { Vector3 } from "three";
import { Vec3 } from "cannon-es";
import CharacterIdle from "./animations/character-idle";
import CharacterWalk from "./animations/character-walk";
import camera from "./camera";
import world, { cubeMesh, cubeBody, characterBody, cannonDebugRenderer } from "./physics";
import Character from "./models/character";
import renderer from "./renderer";
import scene from "./scene";
import isDev from "./utils/is-dev";

let previousRAF = 0,
  tempVector = new Vector3();

const animate = () => {
  requestAnimationFrame((t) => {
    if (Character.walkForward) {
      characterBody.velocity = characterBody.quaternion.vmult(new Vec3(0, 0, 3));
    }
    if (Character.turnLeft) {
      Character.rotation.y += 0.05;
      characterBody.quaternion.copy(Character.quaternion);
      if (!Character.walkForward) characterBody.velocity = characterBody.quaternion.vmult(new Vec3(0, 0, 3));
    }
    if (Character.turnRight) {
      Character.rotation.y -= 0.05;
      characterBody.quaternion.copy(Character.quaternion);
      if (!Character.walkForward) characterBody.velocity = characterBody.quaternion.vmult(new Vec3(0, 0, 3));
    }
    if (!Character.walkForward && !Character.turnLeft && !Character.turnRight) {
      CharacterIdle.update((t - previousRAF) * 0.001);
    } else {
      CharacterWalk.update((t - previousRAF) * 0.001);
      camera.position.lerp(
        new Vector3(Character.position.x - Math.sin(Character.rotation.y) * 20, Character.position.y + 10, Character.position.z - Math.cos(Character.rotation.y) * 20),
        0.1
      );
      tempVector.copy(Character.position).y += 10; // the += is optional
      camera.lookAt(tempVector);
    }

    cubeMesh.position.copy(cubeBody.position);
    cubeMesh.quaternion.copy(cubeBody.quaternion);
    Character.position.copy(characterBody.position);
    Character.position.y -= 5.5;
    // Character.quaternion.copy(characterBody.quaternion);

    world.step(1.0 / 60.0, (t - previousRAF) * 0.003);
    if (isDev) cannonDebugRenderer.update();
    previousRAF = t;
    animate();
  });
  renderer.render(scene, camera);
};

export default animate;
