import { Color, RepeatWrapping } from "three";
import Loaders from "../loaders";
import scene from "../scene";

const x = 0,
  y = 250;

const Gallary = (await Loaders.GLTFLoader.loadAsync("/assets/models/gallary.gltf")).scene;
Gallary.scale.setScalar(80);
Gallary.rotateY(Math.PI / 2);
Gallary.position.set(x, 0, y);
Gallary.traverse((c) => {
  c.receiveShadow = true;
  if (c.isMesh) {
    if (c.material.name == "Material.001") {
      c.material.map = Loaders.TextureLoader.load("/assets/images/wood.jpeg", function (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 4);
      });
      c.material.metalness = 0.7;
      c.material.roughness = 0;
      c.material.color = new Color(0xffffff);
      c.material.specular = 0.7;
    } else c.material.color = new Color(0x888888);
  }
});
scene.add(Gallary);

export default { Gallary };
