import { MeshLambertMaterial, MeshStandardMaterial, Mesh, PlaneGeometry, BoxGeometry } from "three";
import scene from "../scene";
import Loaders from "../loaders";

const sandGeometry = new PlaneGeometry(100, 100, 50, 50);

const map = Loaders.TextureLoader.load("/assets/maps/sand-map.png");
const normalMap = Loaders.TextureLoader.load("/assets/maps/sand-normal.png");
const displacementMap = Loaders.TextureLoader.load("/assets/maps/sand-height.png");

const sandMaterial = new MeshStandardMaterial({
  color: 0x555555,
  map,
  normalMap,
  displacementMap,
  displacementScale: 2,
});

const Sand = new Mesh(sandGeometry, sandMaterial);
Sand.position.set(0, -0.8, 0);
Sand.rotateX(-Math.PI / 2);
Sand.receiveShadow = true;

scene.add(Sand);

const boxMaterial = new MeshLambertMaterial({ color: 0x555555 });

const Box1 = new Mesh(new BoxGeometry(100, 5, 5), boxMaterial);
Box1.position.set(0, 0, -47.5);
Box1.rotateX(Math.PI / 2);
scene.add(Box1);

const Box2 = new Mesh(new BoxGeometry(100, 5, 5), boxMaterial);
Box2.position.set(0, 0, 47.5);
Box2.rotateX(-Math.PI / 2);
scene.add(Box2);

const Box3 = new Mesh(new BoxGeometry(5, 5, 100), boxMaterial);
Box3.position.set(-47.5, 0, 0);
Box3.rotateZ(-Math.PI / 2);
scene.add(Box3);

const Box4 = new Mesh(new BoxGeometry(5, 5, 100), boxMaterial);
Box4.position.set(47.5, 0, 0);
Box4.rotateZ(Math.PI / 2);
scene.add(Box4);

export default [Box1, Box2, Box3, Box4];
