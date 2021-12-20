import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "../camera";
import renderer from "../renderer";
import isDev from "../utils/is-dev";

const Control = isDev ? new OrbitControls(camera, renderer.domElement) : null;

export default Control;
