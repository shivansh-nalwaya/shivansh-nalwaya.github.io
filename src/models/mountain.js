import { CylinderGeometry, MeshPhongMaterial, Mesh, PlaneGeometry, MeshLambertMaterial, DoubleSide } from "three";
import Loaders from "../loaders";
import scene from "../scene";

const Mountain = (await Loaders.GLTFLoader.loadAsync("/assets/models/mnt.gltf")).scene;

Mountain.position.set(145, 0, -70);
Mountain.traverse((c) => {
  c.castShadow = true;
});

scene.add(Mountain);

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
