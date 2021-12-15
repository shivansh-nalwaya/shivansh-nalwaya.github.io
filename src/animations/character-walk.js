import { AnimationMixer } from "three";
import Loaders from "../loaders";
import Character from "../models/character";

const animation = await Loaders.AnimationLoader.loadAsync("/assets/animations/walk.fbx");

const CharacterWalk = new AnimationMixer(Character);

export const CharacterWalkAction = CharacterWalk.clipAction(animation.animations[0]);
CharacterWalkAction.play();

export default CharacterWalk;
