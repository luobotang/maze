const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const fs = require('fs')
const path = require('path')

const outputOptions = {
  format: 'iife',
  name: 'maze_app',
  dir: __dirname,
  file: './index.bundle.js'
}

rollup.rollup({
  input: path.join(__dirname, './index.js'),
  plugins: [
    commonjs({
      include: '**/*.js'
    })
  ]
}).then(bundle => bundle.generate(outputOptions).then(() => bundle.write(outputOptions)))