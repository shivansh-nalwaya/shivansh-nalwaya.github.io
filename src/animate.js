import CharacterIdle from "./animations/character-idle";
import CharacterWalk from "./animations/character-walk";
import camera from "./camera";
import Character from "./models/character";
import renderer from "./renderer";
import scene from "./scene";

let previousRAF = 0;

const animate = () => {
  requestAnimationFrame((t) => {
    animate();
    CharacterWalk.update((t - previousRAF) * 0.001);
    if (Character.walkForward) Character.translateZ(0.1);
    if (Character.turnLeft) {
      Character.rotation.y += 0.05;
      if (!Character.walkBackward && !Character.walkForward) Character.translateZ(0.1);
    }
    if (Character.turnRight) {
      Character.rotation.y -= 0.05;
      if (!Character.walkBackward && !Character.walkForward) Character.translateZ(0.1);
    }
    if (!Character.walkForward && !Character.turnLeft && !Character.turnRight) {
      CharacterIdle.update((t - previousRAF) * 0.001);
    }

    previousRAF = t;
  });
  renderer.render(scene, camera);
};

export default animate;
