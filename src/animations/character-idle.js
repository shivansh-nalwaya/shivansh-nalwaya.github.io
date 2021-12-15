import { AnimationMixer } from "three";
import Loaders from "../loaders";
import Character from "../models/character";

const animation = await Loaders.AnimationLoader.loadAsync("/assets/animations/idle.fbx");

const CharacterIdle = new AnimationMixer(Character);

const idle = CharacterIdle.clipAction(animation.animations[0]);
idle.play();

export default CharacterIdle;
