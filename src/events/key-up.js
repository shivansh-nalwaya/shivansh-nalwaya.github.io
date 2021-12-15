import Character from "../models/character";

const KeyUp = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      Character.walkForward = false;
      break;
    case 37: // left
    case 65: // a
      Character.turnLeft = false;
      break;
    case 40: // down
    case 83: // s
      Character.walkBackward = false;
      break;
    case 39: // right
    case 68: // d
      Character.turnRight = false;
      break;
  }
};

export default KeyUp;
