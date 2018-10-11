var maze_app = (function () {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var direction = createCommonjsModule(function (module, exports) {
	const DIRECTION_UP = exports.DIRECTION_UP       = 0b0001;
	const DIRECTION_RIGHT = exports.DIRECTION_RIGHT = 0b0010;
	const DIRECTION_DOWN = exports.DIRECTION_DOWN   = 0b0100;
	const DIRECTION_LEFT = exports.DIRECTION_LEFT   = 0b1000;

	exports.setDirectionOpen = function (flag, direction) {
	  return flag | direction
	};

	exports.isDirectionOpen = function (flag, direction) {
	  return (flag & direction) === direction
	};

	exports.getOppositeDirection = function (direction) {
	  switch (direction) {
	    case DIRECTION_UP: return DIRECTION_DOWN
	    case DIRECTION_DOWN: return DIRECTION_UP
	    case DIRECTION_LEFT: return DIRECTION_RIGHT
	    case DIRECTION_RIGHT: return DIRECTION_LEFT
	  }
	};
	});
	var direction_1 = direction.DIRECTION_UP;
	var direction_2 = direction.DIRECTION_RIGHT;
	var direction_3 = direction.DIRECTION_DOWN;
	var direction_4 = direction.DIRECTION_LEFT;
	var direction_5 = direction.setDirectionOpen;
	var direction_6 = direction.isDirectionOpen;
	var direction_7 = direction.getOppositeDirection;

	const {
	  DIRECTION_UP,
	  DIRECTION_RIGHT,
	  DIRECTION_DOWN,
	  DIRECTION_LEFT,
	  setDirectionOpen,
	  getOppositeDirection
	} = direction;


	function initMaze(width, height) {
	  const cells = [];
	  const visited = [];

	  for (let i = 0; i < height; i++) {
	    const row = cells[i] = [];
	    const row_visited = visited[i] = [];
	    for (let j = 0; j < width; j++) {
	      row[j] = [i, j, 0b0000]; // 行，列，方向是否open标识位（二进制位分别对应上、右、下、左是否open）
	      row_visited[j] = 0;
	    }
	  }

	  return {
	    cells,
	    visited
	  }
	}

	function hasUnvisitedCell(visited) {
	  for (let i = 0, row_max = visited.length; i < row_max; i++) {
	    const row = visited[i];
	    for (let j = 0, col_max = row.length; j < col_max; j++) {
	      if (row[j] === 0) return true
	    }
	  }
	  return false
	}

	function getUnvisitedNeighbourCell(cell, cells, visited) {
	  const list = getUnvisitedNeighbourCellList(cell, cells, visited);
	  if (list.length === 0) return null
	  return list[random(list.length)]
	}

	function getUnvisitedNeighbourCellList(cell, cells, visited) {
	  const [row, col] = cell;
	  const list = [];
	  const row_max = cells.length;
	  const col_max = cells[0].length;
	  if (row > 0) {
	    if (visited[row - 1][col] === 0) {
	      list.push({direction: DIRECTION_UP, cell: cells[row - 1][col]});
	    }
	  }
	  if (row < row_max - 1) {
	    if (visited[row + 1][col] === 0) {
	      list.push({direction: DIRECTION_DOWN, cell: cells[row + 1][col]});
	    }
	  }
	  if (col > 0) {
	    if (visited[row][col - 1] === 0) {
	      list.push({direction: DIRECTION_LEFT, cell: cells[row][col - 1]});
	    }
	  }
	  if (col < col_max - 1) {
	    if (visited[row][col + 1] === 0) {
	      list.push({direction: DIRECTION_RIGHT, cell: cells[row][col + 1]});
	    }
	  }
	  return list
	}

	function random(max = 1) {
	  return Math.floor(Math.random() * max)
	}

	var util = {
	  setDirectionOpen,
	  initMaze,
	  hasUnvisitedCell,
	  getOppositeDirection,
	  getUnvisitedNeighbourCell,
	  random
	};

	const {
	  setDirectionOpen: setDirectionOpen$1,
	  initMaze: initMaze$1,
	  hasUnvisitedCell: hasUnvisitedCell$1,
	  getOppositeDirection: getOppositeDirection$1,
	  getUnvisitedNeighbourCell: getUnvisitedNeighbourCell$1,
	  random: random$1
	} = util;

	const noop = function() {};

	var tangStep = function (options) {
	  const {width = 40, height = 40, steps = 5, step = noop, done = noop} = options;
	  const {cells, visited} = initMaze$1(width, height);
	  const init_row = random$1(height);
	  const init_col = random$1(width);
	  let current_cell = cells[init_row][init_col];
	  let current_step = 0;
	  let current_cell_index = 0;
	  const MAX_STEP = steps; // 每次最多尝试的步数
	  const stack = [current_cell];
	  let timer;

	  visited[init_row][init_col] = 1;

	  function nextStep() {
	    if (!hasUnvisitedCell$1(visited) || stack.length === 0) {
	      setTimeout(() => done(cells)); // 异步触发，确保在最后一个 step 回调触发之后
	      clearInterval(timer);
	      return
	    }

	    // 当前cell周围无路可走，从 stack 移除
	    const result = getUnvisitedNeighbourCell$1(current_cell, cells, visited);
	    if (!result) {
	      stack.splice(current_cell_index, 1); // 移除
	      resetCurrentCell();
	      return
	    }

	    // 打通两个 cell
	    current_cell[2] = setDirectionOpen$1(current_cell[2], result.direction);
	    result.cell[2] = setDirectionOpen$1(result.cell[2], getOppositeDirection$1(result.direction));
	    // 标记已访问
	    visited[result.cell[0]][result.cell[1]] = 1;
	    stack.push(result.cell);
	    current_cell_index = stack.length - 1;
	    current_cell = result.cell;

	    current_step++;

	    // 当前尝试次数过多，换为随机点
	    if (current_step >= MAX_STEP) {
	      resetCurrentCell();
	    }
	  }

	  function resetCurrentCell() {
	    current_step = 0;
	    current_cell_index = random$1(stack.length);
	    current_cell = stack[current_cell_index];
	  }

	  timer = setInterval(() => {
	    nextStep();
	    step({current: current_cell, cells, visited});
	  }, 100);

	  return () => clearInterval(timer)
	};

	const {
	  DIRECTION_UP: DIRECTION_UP$1,
	  DIRECTION_DOWN: DIRECTION_DOWN$1,
	  DIRECTION_LEFT: DIRECTION_LEFT$1,
	  DIRECTION_RIGHT: DIRECTION_RIGHT$1,
	  isDirectionOpen
	} = direction;

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
	    this.cells = null; // 先设置属性，避免渲染时报错
	  },
	  methods: {
	    build() {
	      if (this.building && this.stop) {
	        this.stop();
	      }
	      this.building = true;
	      const {width, height, steps} = this.options;
	      this.stop = tangStep({
	        width,
	        height,
	        steps,
	        step: ({current, cells, visited}) => {
	          this.current = current;
	          this.cells = cells;
	          this.visited = visited;
	          this.$forceUpdate();
	        },
	        done: (cells) => {
	          this.building = false;
	          this.current = null;
	          this.cells = cells;
	          this.visited = null;
	          this.$forceUpdate();
	        }
	      });
	    },
	    cellClass(cell) {
	      const [row, col, flagOpen] = cell;
	      return {
	        'cell-up-open': isDirectionOpen(flagOpen, DIRECTION_UP$1),
	        'cell-down-open': isDirectionOpen(flagOpen, DIRECTION_DOWN$1),
	        'cell-left-open': isDirectionOpen(flagOpen, DIRECTION_LEFT$1),
	        'cell-right-open': isDirectionOpen(flagOpen, DIRECTION_RIGHT$1),
	        'cell-is-current': cell === this.current,
	        'cell-visited': this.building && this.visited && this.visited[row][col] === 1
	      }
	    }
	  }
	});

	var app = {

	};

	return app;

}());
