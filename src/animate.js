import { Vector3, Raycaster } from "three";
import CharacterIdle from "./animations/character-idle";
import CharacterWalk from "./animations/character-walk";
import camera from "./camera";
import Character from "./models/character";
import Mountain from "./models/mountain";
import renderer from "./renderer";
import scene from "./scene";

let previousRAF = 0,
  tempVector = new Vector3();
var ray = new Raycaster();
var rayPos = new Vector3();

const animate = () => {
  requestAnimationFrame((t) => {
    animate();
    rayPos.set(Character.position.x, 100, Character.position.z);
    var rayDir = new Vector3(0, -1, 0);

    ray.set(rayPos, rayDir);

    let intersect = ray.intersectObject(Mountain.scene);
    if (Object.keys(intersect).length > 0) {
      const y = intersect[0].point.y < 0 ? 0 : intersect[0].point.y;
      Character.position.setY(y);
    }
    if (Character.walkForward) {
      Character.translateZ(0.4);
    }
    if (Character.turnLeft) {
      Character.rotation.y += 0.05;
      if (!Character.walkBackward && !Character.walkForward) Character.translateZ(0.4);
    }
    if (Character.turnRight) {
      Character.rotation.y -= 0.05;
      if (!Character.walkBackward && !Character.walkForward) Character.translateZ(0.4);
    }
    if (!Character.walkForward && !Character.turnLeft && !Character.turnRight) {
      CharacterIdle.update((t - previousRAF) * 0.001);
    } else {
      CharacterWalk.update((t - previousRAF) * 0.001);
      camera.position.copy(Character.position);
      camera.position.x -= Math.sin(Character.rotation.y) * 20;
      camera.position.z -= Math.cos(Character.rotation.y) * 20;
      camera.position.y += 10; // optional
      tempVector.copy(Character.position).y += 10; // the += is optional
      camera.lookAt(tempVector);
    }

    previousRAF = t;
  });
  renderer.render(scene, camera);
};

export default animate;
