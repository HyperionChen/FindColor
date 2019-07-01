
class LevelManager {
  constructor(){
    if (LevelManager.instance) {
      return LevelManager.instance
    }

    LevelManager.instance = this
  }

  getLevels(){
    // 2-6 个，手动生成
    if (this.levels) {
      return this.levels
    }
    this.levels = []
    for (let i = 0; i < 100; i++) {
      let colors = this.createColor()
      let number = i < 5 ? i + 2 : 7
      let diffPosition = Math.floor(Math.random() * number * number)
      let level = i + 1
      let result = ''
      if (level < 10) {
        result = '有眼无珠'
      } else if(level < 20) {
        result = '有眼如盲'
      } else if (level < 30) {
        result = '肉眼凡胎'
      } else if (level < 40) {
        result = '目光如炬'
      } else if (level < 50) {
        result = '离娄之明'
      } else if (level < 60) {
        result = '明察秋毫'
      } else {
        result = '火眼精金'
      }

      this.levels.push({
        level: level,
        normalColor: colors[0],
        diffColor: colors[1],
        number:number,
        array:new Array(number * number),
        diffPosition:diffPosition,
        radius:20,
        result:result,
      })
    }
    return this.levels
  }

  createColor() {
    let max = 225
    let r = Math.floor(Math.random()*max)
    let g = Math.floor(Math.random()*max)
    let b = Math.floor(Math.random()*max)

    let rs = r.toString(16)
    if (rs.length == 1) {
      rs = '0' + rs
    }
    let gs = g.toString(16)
    if (gs.length == 1) {
      gs = '0' + gs
    }
    let bs = b.toString(16)
    if (bs.length == 1) {
      bs = '0' + bs
    }
    let normalColor = '#' + rs + gs + bs

    r += 30
    g += 30
    b += 30
    rs = r.toString(16)
    if (rs.length == 1) {
      rs = '0' + rs
    }
    gs = g.toString(16)
    if (gs.length == 1) {
      gs = '0' + gs
    }
    bs = b.toString(16)
    if (bs.length == 1) {
      bs = '0' + bs
    }

    let diffColor = '#' + rs + gs + bs
    return [normalColor, diffColor]
  }
}

const levelManager = new LevelManager()
export default levelManager
