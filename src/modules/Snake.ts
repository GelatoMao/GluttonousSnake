class Snake {
  // 获取蛇的容器
  element: HTMLElement
  // 蛇头部
  head: HTMLElement
  // 蛇的身体 包括蛇头部
  bodies: HTMLCollection

  constructor() {
    this.element = document.getElementById("snake")!
    this.head = document.querySelector("#snake>div") as HTMLElement
    this.bodies = this.element.getElementsByTagName("div")
  }

  // 获取头部坐标
  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value) {
    // 如果新值和旧值相同 则不需要再进行修改
    if (this.X === value) return
    // X的合法值是0-290之间
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了")
    }
    // 修改X值 修改水平坐标 蛇在左右移动 蛇向左移动时 不能向右掉头 反之亦然
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + "px"
    this.checkHeadBody()
  }

  set Y(value) {
    if (this.Y === value) return
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了")
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    this.moveBody()
    this.head.style.top = value + "px"
    this.checkHeadBody()
  }

  // 蛇增加身体
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  /**
   * 移动身体
   * 将后面身体设置为前面身体的位置
   * 第4节 = 第3节位置
   * 第3节 = 第2节位置
   * 第2节 = 蛇头位置
   */
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop

      ;(this.bodies[i] as HTMLElement).style.left = x + "px"
      ;(this.bodies[i] as HTMLElement).style.top = y + "px"
    }
  }

  // 检查头和身体有没有相撞
  checkHeadBody() {
    // 获取所有身体 检查其是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 蛇撞到身体了
        throw new Error("撞到自己了")
      }
    }
  }
}

export default Snake
