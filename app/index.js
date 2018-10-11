const generate_tang_step = require('../lib/generators/tang-step')
const {
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  isDirectionOpen
} = require('../lib/direction')

new Vue({
  el: '#root',
  data: {
    building: false,
    options: {
      width: 40,
      width_options: [10, 20, 40, 100],
      height: 40,
      height_options: [10, 20, 40, 100],
      steps: 5,
      steps_options: [3, 5, 7, 9, 15]
    }
  },
  created() {
    this.cells = null // 先设置属性，避免渲染时报错
  },
  methods: {
    build() {
      if (this.building && this.stop) {
        this.stop()
      }
      this.building = true
      const {width, height, steps} = this.options
      this.stop = generate_tang_step({
        width,
        height,
        steps,
        step: ({current, cells, visited}) => {
          this.current = current
          this.cells = cells
          this.visited = visited
          this.$forceUpdate()
        },
        done: (cells) => {
          this.building = false
          this.current = null
          this.cells = cells
          this.visited = null
          this.$forceUpdate()
        }
      })
    },
    cellClass(cell) {
      const [row, col, flagOpen] = cell
      return {
        'cell-up-open': isDirectionOpen(flagOpen, DIRECTION_UP),
        'cell-down-open': isDirectionOpen(flagOpen, DIRECTION_DOWN),
        'cell-left-open': isDirectionOpen(flagOpen, DIRECTION_LEFT),
        'cell-right-open': isDirectionOpen(flagOpen, DIRECTION_RIGHT),
        'cell-is-current': cell === this.current,
        'cell-visited': this.building && this.visited && this.visited[row][col] === 1
      }
    }
  }
})
