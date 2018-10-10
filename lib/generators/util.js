const {
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  setDirectionOpen,
  getOppositeDirection
} = require('../direction')


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

module.exports = {
  setDirectionOpen,
  initMaze,
  hasUnvisitedCell,
  getOppositeDirection,
  getUnvisitedNeighbourCell,
  random
}
