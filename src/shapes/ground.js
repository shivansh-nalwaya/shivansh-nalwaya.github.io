import { CircleGeometry, MeshLambertMaterial, Mesh } from "three";
import { Body, Plane } from "cannon-es";
import world from "../physics";
import scene from "../scene";

const geometry = new CircleGeometry(400, 32);

const material = new MeshLambertMaterial({ color: 0x273d10 });

const Ground = new Mesh(geometry, material);
Ground.rotateX(-Math.PI / 2);
Ground.receiveShadow = true;

scene.add(Ground);

const groundBody = new Body({
  type: Body.STATIC,
  shape: new Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
world.addBody(groundBody);

export default Ground;
