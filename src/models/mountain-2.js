import scene from "../scene";
import Mountain from "./mountain";

const Mountain2 = Mountain.clone();
Mountain2.position.set(245, 0, 30);
scene.add(Mountain2);

export default Mountain2;
