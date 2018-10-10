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
  let current_cell = cells[init_row][init_col]
  const stack = [current_cell]

  visited[init_row][init_col] = 1

  while (hasUnvisitedCell(visited)) {
    if (stack.length === 0) break
    const i = random(stack.length)
    current_cell = stack[i]
    const result = getUnvisitedNeighbourCell(current_cell, cells, visited)
    if (!result) {
      stack.splice(i, 1) // 移除
      continue
    }
    // 打通两个 cell
    current_cell[2] = setDirectionOpen(current_cell[2], result.direction)
    result.cell[2] = setDirectionOpen(result.cell[2], getOppositeDirection(result.direction))
    // 标记已访问
    visited[result.cell[0]][result.cell[1]] = 1
    stack.push(result.cell)
  }

  return {cells}
}