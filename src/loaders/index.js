import AnimationLoader from "./animation-loader";
import FBXModelLoader from "./fbx-loader";
import GLTFModelLoader from "./gltf-loader";
import Loader from "./texture-loader";

const Loaders = {
  TextureLoader: Loader,
  FBXLoader: FBXModelLoader,
  GLTFLoader: GLTFModelLoader,
  AnimationLoader: AnimationLoader,
};

export default Loaders;
