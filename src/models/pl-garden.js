import { MeshLambertMaterial, MeshStandardMaterial, Mesh, PlaneGeometry, BoxGeometry } from "three";
import scene from "../scene";
import Loaders from "../loaders";

const sandGeometry = new PlaneGeometry(500, 500, 50, 50);

const map = Loaders.TextureLoader.load("/assets/maps/sand-map.png");
const normalMap = Loaders.TextureLoader.load("/assets/maps/sand-normal.png");
const displacementMap = Loaders.TextureLoader.load("/assets/maps/sand-height.png");

const sandMaterial = new MeshStandardMaterial({
  color: 0x112311,
  //   map,
  //   normalMap,
  //   displacementMap,
  //   displacementScale: 10,
});

const x = -200,
  y = -200;

const Sand = new Mesh(sandGeometry, sandMaterial);
Sand.position.set(x, -10, y);
Sand.rotateX(-Math.PI / 2);
Sand.receiveShadow = true;

// scene.add(Sand);

const python = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

python.scale.setScalar(0.5);
python.position.set(x, 0, y);
python.rotation.set(0, 0, Math.PI / 2);
python.traverse((c) => {
  c.castShadow = true;
});
scene.add(python);

const boxMaterial = new MeshLambertMaterial({ color: 0x555555 });

const Box1 = new Mesh(new BoxGeometry(100, 5, 5), boxMaterial);
Box1.position.set(x, 0, y - 47.5);
Box1.rotateX(Math.PI / 2);
// scene.add(Box1);

const Box2 = new Mesh(new BoxGeometry(100, 5, 5), boxMaterial);
Box2.position.set(x, 0, y + 47.5);
Box2.rotateX(-Math.PI / 2);
// scene.add(Box2);

const Box3 = new Mesh(new BoxGeometry(5, 5, 100), boxMaterial);
Box3.position.set(x - 47.5, 0, y);
Box3.rotateZ(-Math.PI / 2);
// scene.add(Box3);

const Box4 = new Mesh(new BoxGeometry(5, 5, 100), boxMaterial);
Box4.position.set(x + 47.5, 0, y);
Box4.rotateZ(Math.PI / 2);
// scene.add(Box4);

export default [python];
