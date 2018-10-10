const DIRECTION_UP = exports.DIRECTION_UP       = 0b0001
const DIRECTION_RIGHT = exports.DIRECTION_RIGHT = 0b0010
const DIRECTION_DOWN = exports.DIRECTION_DOWN   = 0b0100
const DIRECTION_LEFT = exports.DIRECTION_LEFT   = 0b1000

exports.setDirectionOpen = function (flag, direction) {
  return flag | direction
}

exports.isDirectionOpen = function (flag, direction) {
  return (flag & direction) === direction
}

exports.getOppositeDirection = function (direction) {
  switch (direction) {
    case DIRECTION_UP: return DIRECTION_DOWN
    case DIRECTION_DOWN: return DIRECTION_UP
    case DIRECTION_LEFT: return DIRECTION_RIGHT
    case DIRECTION_RIGHT: return DIRECTION_LEFT
  }
}
