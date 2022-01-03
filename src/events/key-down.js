import Main from "../characters/main";

const KeyDown = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      Main.walkForward = true;
      break;
    case 37: // left
    case 65: // a
      Main.turnLeft = true;
      break;
    case 40: // down
    case 83: // s
      Main.walkBackward = true;
      break;
    case 39: // right
    case 68: // d
      Main.turnRight = true;
      break;
  }
};

export default KeyDown;
