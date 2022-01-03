import { Vector3 } from "three";
import Loaders from "../loaders";

class Base {
  scalar = 1;
  rotation = [0, 0, 0];
  position = [0, 0, 0];

  constructor(file) {
    if (file.endsWith("gltf")) this.model = await Loaders.GLTFLoader.loadAsync(file);
    else if (file.endsWith("fbx")) this.model = await Loaders.FBXLoader.loadAsync(file);
    this.model.scene.scale.setScalar(1);
    this.model.scene.position.set(400, -110, 220);
    this.model.scene.traverse((c) => {
      c.castShadow = true;
      if (c.isMesh) {
        c.material.color = new Color(0x977c53);
      }
    });

    scene.add(Mountain.scene);
  }
}
