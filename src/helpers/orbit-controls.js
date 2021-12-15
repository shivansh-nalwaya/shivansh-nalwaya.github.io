import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "../camera";
import renderer from "../renderer";

const Control = new OrbitControls(camera, renderer.domElement);

export default Control;
