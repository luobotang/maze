const {
  setDirectionOpen,
  initMaze,
  hasUnvisitedCell,
  getOppositeDirection,
  getUnvisitedNeighbourCell,
  random
} = require('./util')

module.exports = function (width = 40, height = 40, steps = 5) {
  const {cells, visited} = initMaze(width, height)
  const init_row = random(height)
  const init_col = random(width)
  let current_cell = cells[init_row][init_col]
  let current_step = 0
  let current_cell_index = 0
  const MAX_STEP = steps // 每次最多尝试的步数
  const stack = [current_cell]

  visited[init_row][init_col] = 1

  while (hasUnvisitedCell(visited)) {
    if (stack.length === 0) break

    // 当前cell周围无路可走，从 stack 移除
    const result = getUnvisitedNeighbourCell(current_cell, cells, visited)
    if (!result) {
      stack.splice(current_cell_index, 1) // 移除
      resetCurrentCell()
      continue
    }

    // 打通两个 cell
    current_cell[2] = setDirectionOpen(current_cell[2], result.direction)
    result.cell[2] = setDirectionOpen(result.cell[2], getOppositeDirection(result.direction))
    // 标记已访问
    visited[result.cell[0]][result.cell[1]] = 1
    stack.push(result.cell)
    current_cell_index = stack.length - 1
    current_cell = result.cell

    current_step++

    // 当前尝试次数过多，换为随机点
    if (current_step >= MAX_STEP) {
      resetCurrentCell()
    }
  }

  function resetCurrentCell() {
    current_step = 0
    current_cell_index = random(stack.length)
    current_cell = stack[current_cell_index]
  }

  return {cells}
}