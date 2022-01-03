import Main from "../characters/main";

const KeyUp = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      Main.walkForward = false;
      break;
    case 37: // left
    case 65: // a
      Main.turnLeft = false;
      break;
    case 40: // down
    case 83: // s
      Main.walkBackward = false;
      break;
    case 39: // right
    case 68: // d
      Main.turnRight = false;
      break;
  }
};

export default KeyUp;
