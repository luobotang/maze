/**
 * 参考：
 * 
 * 三大迷宫生成算法 (Maze generation algorithm) -- 深度优先，随机Prim，递归分割
 * https://blog.csdn.net/juzihongle1/article/details/73135920
 *
 **/

const {
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  setDirectionOpen,
  getOppositeDirection
} = require('./direction')

// 深度优先/递归回溯算法
exports.generate_backtracker = function (width = 40, height = 40, init_point_count = 1) {
  const {cells, visited} = initMaze(width, height)
  const init_points = new Array(init_point_count)

  for (let i = 0; i < init_point_count; i++) {
    const point = init_points[i] = {current: null, stack: [], stopped: false}
    // 初始化一个随机位置
    let row
    let col
    while (true) {
      row = random(height)
      col = random(width)
      if (visited[row][col] === 0) break
    }
    visited[row][col] = 1
    point.current = cells[row][col]
  }

  while (hasUnvisitedCell(visited)) {
    for (let i = 0; i < init_point_count; i++) {
      move_point(init_points[i])
    }
  }

  function move_point(point) {
    if (point.stopped) return
  
    const current_cell = point.current
    const stack = point.stack
    let result = getUnvisitedNeighbourCell(current_cell, cells, visited)

    if (!result) {
      if (stack.length) {
        point.current = stack.pop()
      } else {
        point.stopped = true
      }
      return
    }

    stack.push(current_cell)
    current_cell[2] = setDirectionOpen(current_cell[2], result.direction)
    const new_cell = point.current = result.cell
    visited[new_cell[0]][new_cell[1]] = 1
    new_cell[2] = setDirectionOpen(new_cell[2], getOppositeDirection(result.direction))
  }

  return {cells}
}

// prim 算法
exports.generate_prim = function(width = 40, height = 40) {
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

function initMaze(width, height) {
  const cells = []
  const visited = []

  for (let i = 0; i < height; i++) {
    const row = cells[i] = []
    const row_visited = visited[i] = []
    for (let j = 0; j < width; j++) {
      row[j] = [i, j, 0b0000] // 行，列，方向是否open标识位（二进制位分别对应上、右、下、左是否open）
      row_visited[j] = 0
    }
  }

  return {
    cells,
    visited
  }
}

function hasUnvisitedCell(visited) {
  for (let i = 0, row_max = visited.length; i < row_max; i++) {
    const row = visited[i]
    for (let j = 0, col_max = row.length; j < col_max; j++) {
      if (row[j] === 0) return true
    }
  }
  return false
}

function getUnvisitedNeighbourCell(cell, cells, visited) {
  const list = getUnvisitedNeighbourCellList(cell, cells, visited)
  if (list.length === 0) return null
  return list[random(list.length)]
}

function getUnvisitedNeighbourCellList(cell, cells, visited) {
  const [row, col] = cell
  const list = []
  const row_max = cells.length
  const col_max = cells[0].length
  if (row > 0) {
    if (visited[row - 1][col] === 0) {
      list.push({direction: DIRECTION_UP, cell: cells[row - 1][col]})
    }
  }
  if (row < row_max - 1) {
    if (visited[row + 1][col] === 0) {
      list.push({direction: DIRECTION_DOWN, cell: cells[row + 1][col]})
    }
  }
  if (col > 0) {
    if (visited[row][col - 1] === 0) {
      list.push({direction: DIRECTION_LEFT, cell: cells[row][col - 1]})
    }
  }
  if (col < col_max - 1) {
    if (visited[row][col + 1] === 0) {
      list.push({direction: DIRECTION_RIGHT, cell: cells[row][col + 1]})
    }
  }
  return list
}

function random(max = 1) {
  return Math.floor(Math.random() * max)
}
