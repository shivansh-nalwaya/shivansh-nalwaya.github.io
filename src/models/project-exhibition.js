import { BoxGeometry } from "three";
import { CylinderGeometry, MeshPhongMaterial, Mesh } from "three";
import Loaders from "../loaders";
import scene from "../scene";

const x = 200,
  y = 150;

let poloeGeometry = new CylinderGeometry(0.5, 0.5, 20, 16, 1);
let poleMaterial = new MeshPhongMaterial({
  color: "#999999",
  specular: "#999999",
  shininess: 30,
});
const pole = new Mesh(poloeGeometry, poleMaterial);
pole.position.set(x, 10, y - 58);
pole.castShadow = true;
scene.add(pole);

const pole2 = pole.clone();
pole2.position.set(x, 10, y - 42);
scene.add(pole2);

const box = new BoxGeometry(2, 16, 20);
const map = Loaders.TextureLoader.load("/assets/images/project-1.png");
const material = new MeshPhongMaterial({ map });
const project = new Mesh(box, material);
project.castShadow = true;
project.position.set(x, 20, y - 50);
scene.add(project);

const pole3 = pole.clone();
pole3.position.set(x + 60, 10, y - 18);
scene.add(pole3);

const pole4 = pole.clone();
pole4.position.set(x + 60, 10, y - 2);
scene.add(pole4);

const project2 = project.clone();
project2.position.set(x + 60, 20, y - 10);
scene.add(project2);

const pole5 = pole.clone();
pole5.position.set(x + 120, 10, y + 38);
scene.add(pole5);

const pole6 = pole.clone();
pole6.position.set(x + 120, 10, y + 22);
scene.add(pole6);

const project3 = project.clone();
project3.position.set(x + 120, 20, y + 30);
scene.add(project3);

const pole7 = pole.clone();
pole7.position.set(x + 110, 10, y + 168);
scene.add(pole7);

const pole8 = pole.clone();
pole8.position.set(x + 110, 10, y + 152);
scene.add(pole8);

const project4 = project.clone();
project4.position.set(x + 110, 20, y + 160);
scene.add(project4);

const pole9 = pole.clone();
pole9.position.set(x + 50, 10, y + 128);
scene.add(pole9);

const pole10 = pole.clone();
pole10.position.set(x + 50, 10, y + 112);
scene.add(pole10);

const project5 = project.clone();
project5.position.set(x + 50, 20, y + 120);
scene.add(project5);

const pole11 = pole.clone();
pole11.position.set(x - 10, 10, y + 88);
scene.add(pole11);

const pole12 = pole.clone();
pole12.position.set(x - 10, 10, y + 72);
scene.add(pole12);

const project6 = project.clone();
project6.position.set(x - 10, 20, y + 80);
scene.add(project6);

export default [pole];
