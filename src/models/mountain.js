import { Color, CylinderGeometry, MeshPhongMaterial, Mesh, PlaneGeometry, MeshLambertMaterial, DoubleSide } from "three";
import Loaders from "../loaders";
import scene from "../scene";

const Mountain = await Loaders.GLTFLoader.loadAsync("/assets/models/mountain/source/Unity2Skfb/Unity2Skfb.gltf");

Mountain.scene.scale.setScalar(1);
Mountain.scene.position.set(400, -110, 220);
Mountain.scene.traverse((c) => {
  c.castShadow = true;
  if (c.isMesh) {
    c.material.color = new Color(0x977c53);
  }
});

scene.add(Mountain.scene);

const python = await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf");

python.scene.scale.setScalar(0.5);
python.scene.position.set(-20, 0, -30);
python.scene.rotation.set(0, 0, Math.PI / 2);
python.scene.traverse((c) => {
  c.castShadow = true;
});
scene.add(python.scene);

const Mountain2 = Mountain.scene.clone();
Mountain2.position.set(500, -110, 320);
scene.add(Mountain2);

const Mountain3 = Mountain.scene.clone();
Mountain3.position.set(550, -110, 180);
scene.add(Mountain3);

let poloeGeometry = new CylinderGeometry(0.5, 0.5, 20, 16, 1);
let poleMaterial = new MeshPhongMaterial({
  color: "#999999",
  specular: "#999999",
  shininess: 30,
});
const pole = new Mesh(poloeGeometry, poleMaterial);
pole.position.set(150, 68, -65);
scene.add(pole);

const pole2 = pole.clone();
pole2.position.set(250, 68, 35);
scene.add(pole2);

const pole3 = pole.clone();
pole3.position.set(300, 68, -105);
scene.add(pole3);

const flagGeometry = new PlaneGeometry(15, 10, 9, 6);
const flagMaterial = new MeshLambertMaterial({
  side: DoubleSide,
  map: await Loaders.TextureLoader.loadAsync("/assets/images/awign-logo.png"),
});
export const flag = new Mesh(flagGeometry, flagMaterial);
flag.rotation.set(0, -Math.PI / 2, 0);
flag.position.set(150, 73, -57.5);
scene.add(flag);

const flagMaterial2 = new MeshLambertMaterial({
  side: DoubleSide,
  map: await Loaders.TextureLoader.loadAsync("/assets/images/tbi-logo.png"),
});
const flag2 = flag.clone();
flag2.position.set(250, 73, 27.5);
flag2.material = flagMaterial2;
scene.add(flag2);

const flagMaterial3 = new MeshLambertMaterial({
  side: DoubleSide,
  map: await Loaders.TextureLoader.loadAsync("/assets/images/sixerclass-logo.png"),
});
const flag3 = flag.clone();
flag3.position.set(300, 73, -97.5);
flag3.material = flagMaterial3;
scene.add(flag3);

export default Mountain;
