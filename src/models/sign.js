import { MeshPhongMaterial, Mesh } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Loaders from "../loaders";
import scene from "../scene";

const Sign = await Loaders.GLTFLoader.loadAsync("/assets/models/sign/scene.gltf");

Sign.scene.scale.setScalar(8);
Sign.scene.position.set(80, 7, -20);
Sign.scene.traverse((c) => {
  c.castShadow = true;
});

const font = await Loaders.FontLoader.loadAsync("/assets/fonts/helvetiker_regular.typeface.json");

const textGeo = new TextGeometry("Experiences", {
  font,
  size: 70,
  height: 20,
  curveSegments: 4,
  bevelThickness: 2,
  bevelSize: 1.5,
  bevelEnabled: true,
});

const textMesh = new Mesh(textGeo, new MeshPhongMaterial({ color: 0xffffff, flatShading: true }));
textMesh.scale.setScalar(0.014);
scene.add(textMesh);
textMesh.position.set(76.2, 9, -19.3);

scene.add(Sign.scene);

export default Sign;
