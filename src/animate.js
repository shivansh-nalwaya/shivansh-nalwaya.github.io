import camera from "./camera";
import renderer from "./renderer";
import scene from "./scene";

const animate = () => {
  requestAnimationFrame((t) => {
    animate();
  });
  renderer.render(scene, camera);
};

export default animate;
