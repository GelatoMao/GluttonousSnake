// 定义积分牌的类
class ScorePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement

  // 限制等级
  maxLevel: number
  // 多少分升级
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!
    this.levelEle = document.getElementById("level")!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 加分方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ""
    // 分数为整十的时候进行升级
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 提升等级
  levelUp() {
    if (this.level <= this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ""
    }
  }
}

export default ScorePanel
