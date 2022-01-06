import scene from "../scene";
import Loaders from "../loaders";

const x = -200,
  y = -250;

const python = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

python.scale.setScalar(0.5);
python.position.set(x, 0, y - 150);
python.rotation.set(0, 0, Math.PI / 2);
python.traverse((c) => {
  c.castShadow = true;
});
scene.add(python);

const react = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

react.scale.setScalar(0.5);
react.position.set(x - 75, 0, y - 75);
react.rotation.set(0, 0, Math.PI / 2);
react.traverse((c) => {
  c.castShadow = true;
});
scene.add(react);

const ror = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

ror.scale.setScalar(0.5);
ror.position.set(x - 150, 0, y);
ror.rotation.set(0, 0, Math.PI / 2);
ror.traverse((c) => {
  c.castShadow = true;
});
scene.add(ror);

const golang = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

golang.scale.setScalar(0.5);
golang.position.set(x - 75, 0, y + 75);
golang.rotation.set(0, 0, Math.PI / 2);
golang.traverse((c) => {
  c.castShadow = true;
});
scene.add(golang);

const node = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

node.scale.setScalar(0.5);
node.position.set(x, 0, y + 150);
node.rotation.set(0, 0, Math.PI / 2);
node.traverse((c) => {
  c.castShadow = true;
});
scene.add(node);

const dbms = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

dbms.scale.setScalar(0.5);
dbms.position.set(x + 75, 0, y + 75);
dbms.rotation.set(0, 0, Math.PI / 2);
dbms.traverse((c) => {
  c.castShadow = true;
});
scene.add(dbms);

const aws = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

aws.scale.setScalar(0.5);
aws.position.set(x + 150, 0, y);
aws.rotation.set(0, 0, Math.PI / 2);
aws.traverse((c) => {
  c.castShadow = true;
});
scene.add(aws);

const heroku = (await Loaders.GLTFLoader.loadAsync("/assets/models/python.gltf")).scene;

heroku.scale.setScalar(0.5);
heroku.position.set(x + 75, 0, y - 75);
heroku.rotation.set(0, 0, Math.PI / 2);
heroku.traverse((c) => {
  c.castShadow = true;
});
scene.add(heroku);

export default [python];
