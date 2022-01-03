import scene from "../scene";
import Mountain from "./mountain";

const Mountain3 = Mountain.clone();
Mountain3.position.set(295, 0, -110);
scene.add(Mountain3);

export default Mountain3;
