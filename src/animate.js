import CharacterIdle from "./animations/character-idle";
import camera from "./camera";
import renderer from "./renderer";
import scene from "./scene";

let previousRAF;

const animate = () => {
  requestAnimationFrame((t) => {
    if (previousRAF === null) {
      previousRAF = t;
    }

    animate();

    CharacterIdle.update((t - previousRAF || 0) * 0.001);

    previousRAF = t;
  });
  renderer.render(scene, camera);
};

export default animate;
