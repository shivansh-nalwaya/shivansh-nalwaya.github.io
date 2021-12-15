import AnimationLoader from "./animation-loader";
import FBXModelLoader from "./fbx-loader";
import Loader from "./texture-loader";

const Loaders = {
  TextureLoader: Loader,
  FBXLoader: FBXModelLoader,
  AnimationLoader: AnimationLoader,
};

export default Loaders;
