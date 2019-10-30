function main() {
  leinwand = new Leinwand('leinwand')

  var l = new Line()
  for (let i = 0; i < 10; i += 0.05) {
    let size = 10
    if (i < 2) {
      size = i * 5 + 0.1
    }
    if (i > 8) {
      size = (10 - i) * 5 + 0.1
    }
    l.addDot(100 + i * i * 3, 100 + i * 20, size)
  }
  leinwand.addLine(l)

  leinwand.draw()
}
