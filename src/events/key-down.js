import Character from "../models/character";

const KeyDown = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      Character.walkForward = true;
      break;
    case 37: // left
    case 65: // a
      Character.turnLeft = true;
      break;
    case 40: // down
    case 83: // s
      Character.walkBackward = true;
      break;
    case 39: // right
    case 68: // d
      Character.turnRight = true;
      break;
  }
};

export default KeyDown;
