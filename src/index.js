import animate from "./animate";
import Shapes from "./shapes";
import Lights from "./lights";
import Helpers from "./helpers";
import Models from "./models";
import Animations from "./animations";
import Events from "./events";

Shapes();
Lights();
Helpers();
Models();
Animations();

const { KeyDown, KeyUp } = Events();

document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);

const start = animate;

export default start;
