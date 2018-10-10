const {
  setDirectionOpen,
  initMaze,
  hasUnvisitedCell,
  getOppositeDirection,
  getUnvisitedNeighbourCell,
  random
} = require('./util')

module.exports = function (width = 40, height = 40) {
  const {cells, visited} = initMaze(width, height)
  const init_row = random(height)
  const init_col = random(width)
  let current_cell = cells[init_row][init_col] // 从随机位置开始

  visited[init_row][init_col] = 1

  const stack = []

  while (hasUnvisitedCell(visited)) {
    let result = getUnvisitedNeighbourCell(current_cell, cells, visited)
    if (result) {
      stack.push(current_cell)
      current_cell[2] = setDirectionOpen(current_cell[2], result.direction)
      current_cell = result.cell
      visited[current_cell[0]][current_cell[1]] = 1
      current_cell[2] = setDirectionOpen(current_cell[2], getOppositeDirection(result.direction))
    } else if (stack.length > 0) {
      current_cell = stack.pop()
    } else {
      break
    }
  }

  return {cells}
}