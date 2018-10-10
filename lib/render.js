const {
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  isDirectionOpen
} = require('./direction')

exports.renderToJSON = function(maze) {
  return (
    '[\n' +
    maze.cells.map((row) => (
      ' [\n' +
        row.map((cell) => '  [' + cell.join(',') + ']').join(',\n') +
      '\n ]'
    )).join(',\n') +
    '\n]'
  )
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