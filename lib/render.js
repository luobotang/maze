const {
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  isDirectionOpen
} = require('./direction')
const {toJSON} = require('./generators/util')

exports.renderToJSON = function(maze) {
  return toJSON(maze.cells)
}

exports.renderToHTML = function (maze) {
  return (
    '<table class="maze">\n' +
      '<tbody>\n' +
        maze.cells.map((row) => (
          '<tr>\n' +
            (row.map((cell) => {
              const cls = []
              const flag = cell[2]
              if (isDirectionOpen(flag, DIRECTION_UP)) cls.push('cell-up-open')
              if (isDirectionOpen(flag, DIRECTION_RIGHT)) cls.push('cell-right-open')
              if (isDirectionOpen(flag, DIRECTION_DOWN)) cls.push('cell-down-open')
              if (isDirectionOpen(flag, DIRECTION_LEFT)) cls.push('cell-left-open')
              return '<td class="'+ cls.join(' ')+'"></td>'
            }).join('\n')) +
          '</tr>'
        )).join('\n') +
      '\n</tbody>\n' +
    '</table>'
  )
}