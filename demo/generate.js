const fs = require('fs')
const path = require('path')
const {generate_backtracker, generate_prim, generate_tang} = require('../lib/generator')
const {renderToJSON, renderToHTML} = require('../lib/render')

renderMazeAndOutput(generate_backtracker(), 'backtracker')
renderMazeAndOutput(generate_prim(), 'prim')
renderMazeAndOutput(generate_tang(), 'tang')

function renderMazeAndOutput(maze, name) {
  const html = (
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>maze - ${name}</title>
  <link rel="stylesheet" href="maze.css">
</head>
<body>
${renderToHTML(maze)}
<script id="maze" type="text/json">
${renderToJSON(maze)}
</script>
</body>
</html>
`
  )
  fs.writeFile(path.join(__dirname, '../demo/' + name + '.html'), html, {encoding: 'utf8'}, (err) => {
    if (err) throw err
  })
}