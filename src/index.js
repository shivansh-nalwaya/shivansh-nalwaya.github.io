import Shapes from "./shapes";
import Lights from "./lights";
import Helpers from "./helpers";
import Characters from "./characters";
import Events from "./events";
import renderer from "./renderer";
import scene from "./scene";
import camera from "./camera";

Shapes();
Lights();
Helpers();
const { Main } = Characters();

const { KeyDown, KeyUp } = Events();

document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);

let previousRAF = 0;

const run = () => {
  requestAnimationFrame((t) => {
    run();
    Main.customAnimation((t - previousRAF) * 0.001);
    previousRAF = t;
  });
  renderer.render(scene, camera);
};

export default run;
