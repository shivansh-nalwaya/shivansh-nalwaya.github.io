import { MeshLambertMaterial, Shape, ExtrudeGeometry, Mesh } from "three";
import scene from "../scene";

const material = new MeshLambertMaterial({
  color: 0x85873c,
});

const shape = new Shape();

const svg =
  "M 400 400 L 400 425 L 465 450 L 525 400 L 535 365 L 500 370 L 480 355 L 495 345 L 525 315 L 535 315 L 560 325 L 570 335 L 595 340 L 605 335 L 625 325 L 635 300 L 655 290 L 680 290 L 690 300 L 695 325 L 720 365 L 740 365 L 740 360 L 750 320 L 730 245 L 695 195 L 650 125 L 575 80 L 465 50 L 420 50 L 400 80 L 420 90 L 450 90 L 520 90 L 555 90 L 600 115 L 625 125 L 650 160 L 685 215 L 730 290 L 725 320 L 700 295 L 685 280 L 665 270 L 635 270 L 610 275 L 610 295 L 590 310 L 560 305 L 545 305 L 510 295 L 485 305 L 480 325 L 455 355 L 420 360 L 375 380 L 400 395";
const points = svg.split(" ");
let i = 0;
while (i < points.length) {
  if (points[i] == "M") shape.moveTo(points[++i] - 400, points[++i] - 400);
  if (points[i] == "L") shape.lineTo(points[++i] - 400, points[++i] - 320);
  if (points[i] == "Q") shape.quadraticCurveTo(points[++i] - 400, points[++i] - 400, points[++i] - 400, points[++i] - 400);
  i += 1;
}

const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 0.5 };

const geometry = new ExtrudeGeometry(shape, extrudeSettings);
const path = new Mesh(geometry, material);

path.receiveShadow = true;
path.rotateX(Math.PI / 2);
path.position.setY(0.5);
path.position.setZ(0);

scene.add(path);

export default path;
