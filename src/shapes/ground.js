import { CircleGeometry, MeshLambertMaterial, MeshStandardMaterial, Mesh, PlaneGeometry, BoxGeometry } from "three";
import scene from "../scene";
import Loaders from "../loaders";

const geometry = new CircleGeometry(400, 32);

const material = new MeshLambertMaterial({ color: 0x273d10 });

const Ground = new Mesh(geometry, material);
Ground.rotateX(-Math.PI / 2);
Ground.receiveShadow = true;

scene.add(Ground);

export default Ground;
