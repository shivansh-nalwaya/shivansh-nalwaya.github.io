import AnimationLoader from "./animation-loader";
import FBXModelLoader from "./fbx-loader";
import GLTFModelLoader from "./gltf-loader";
import TextureLoader from "./texture-loader";
import FontLoader from "./font-loader";

const Loaders = {
  TextureLoader: TextureLoader,
  FBXLoader: FBXModelLoader,
  GLTFLoader: GLTFModelLoader,
  AnimationLoader: AnimationLoader,
  FontLoader,
};

export default Loaders;
