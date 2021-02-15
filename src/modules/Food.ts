// 定义食物类
class Food {
  // 定义属性表示食物所对应的元素
  element: HTMLElement

  constructor() {
    this.element = document.getElementById("food")!
  }

  // 获取食物x轴坐标
  get X() {
    return this.element.offsetLeft
  }

  // 获取食物y轴坐标
  get Y() {
    return this.element.offsetTop
  }

  // 改变食物位置
  change() {
    // 生成随机位置 最小是0 最大是290
    const top = Math.round(Math.random() * 29) * 10
    const left = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + "px"
    this.element.style.top = top + "px"
  }
}

export default Food
