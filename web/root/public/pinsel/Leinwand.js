class Leinwand {
  constructor(elementId) {
    this.canvas = document.getElementById(elementId)
    this.canvas.width = '500'
    this.canvas.height = '500'
    this.canvas.style.background = 'white'
    this.lines = []
    this.canvas.onclick = function() {
      console.log(1 + 1)
    }
  }
  addLine(line) {
    this.lines.push(line)
  }
  draw() {
    let context = this.canvas.getContext('2d')
    for (let line of this.lines) {
      line.draw(context)
    }
  }
}