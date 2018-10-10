/**
 * 参考：
 * 
 * 三大迷宫生成算法 (Maze generation algorithm) -- 深度优先，随机Prim，递归分割
 * https://blog.csdn.net/juzihongle1/article/details/73135920
 *
 **/

module.exports = {
  generate_backtracker: require('./generators/backtracker'),
  generate_prim: require('./generators/prim'),
  generate_tang: require('./generators/tang')
}