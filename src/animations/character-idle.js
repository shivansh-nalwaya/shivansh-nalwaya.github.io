import { AnimationMixer } from "three";
import Loaders from "../loaders";
import Character from "../models/character";

const animation = await Loaders.AnimationLoader.loadAsync("/assets/animations/idle.fbx");

const CharacterIdle = new AnimationMixer(Character);

export const CharacterIdleAction = CharacterIdle.clipAction(animation.animations[0]);
CharacterIdleAction.play();

export default CharacterIdle;
