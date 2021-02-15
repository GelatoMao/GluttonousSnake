import Snake from "./Snake"
import ScorePanel from "./ScorePanel"
import Food from "./Food"

// 游戏控制器 控制其他所有类
class GameControl {
  // 定义三个属性
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  // 存储蛇的移动方向 就是按键的方向
  direction: string = ""

  // 设置属性记录游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)
    this.init()
  }

  // 游戏初始化方法 调用游戏即开始
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this))
    this.run()
  }

  /**
   * 键盘按下的响应函数
   * ArrowDown
   * ArrowUp
   * ArrowLeft
   * ArrowRight
   */
  keydownHandler(event: KeyboardEvent) {
    // 检查event.key是否合法 用户是否按了正确的按键
    // 修改direction属性 注意这边this
    this.direction = event.key
  }

  /**
   * 控制蛇移动的方法
   * 根据方向使蛇的位置改变
   * 向上 top减少
   * 向下 top增加
   * 向左 left减少
   * 向右 left增加
   */
  run() {
    // 获取蛇当前坐标
    let x = this.snake.X
    let y = this.snake.Y
    switch (this.direction) {
      case "ArrowUp":
        y -= 10
        break

      case "ArrowDown":
        y += 10
        break

      case "ArrowLeft":
        x -= 10
        break

      case "ArrowRight":
        x += 10
        break
    }

    this.checkEat(x, y)

    try {
      this.snake.X = x
      this.snake.Y = y
    } catch (e) {
      alert(e.message + "GAME OVER!")
      this.isLive = false
    }

    // 开启定时器调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 检查蛇是否吃到食物
  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}

export default GameControl
