const FilterCommand = require('../FilterCommand')
const command = new FilterCommand(filter)
command.name = 'edges'

const getPixel = require('../helperFunctions/getPixel')
const getIndex = require('../helperFunctions/getIndex')

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  let avgs = new Array()
  let result = new Array()
  let resultF = new Array()
  for (let i = 0; i < subPixelCount; i += 4) {
    let r = cxd.data[i] ** 2
    let g = cxd.data[i + 1] ** 2
    let b = cxd.data[i + 2] ** 2
    let v = Math.sqrt(r + g + b)
    avgs.push(v)
    result.push(0)
    resultF.push(0)
  }

  let filters = []

  filters.push([
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ])
  filters.push([
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1],
  ])
  filters.push([
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ])
  filters.push([
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1],
  ])

  for (let y = 0; y < cxd.height; y++) {
    for (let x = 0; x < cxd.width; x++) {
      for (let filter of filters) {
        var fsum = 0
        for (let subY = -1; subY <= 1; subY++) {
          for (let subX = -1; subX <= 1; subX++) {
            let v = getPixel(cxd, avgs, x + subX, y + subY)
            fsum += filter[subY + 1][subX + 1] * v
          }
        }
        let i = getIndex(cxd, x, y)
        if (fsum > 35) {
          result[i] += fsum / 4
          resultF[i] += 1
        }
      }
    }
  }

  result = result.map((r, i) => (resultF[i] > 1 ? r : 0))

  for (let y = 0; y < cxd.height; y++) {
    for (let x = 0; x < cxd.width; x++) {
      let p = getPixel(cxd, result, x, y)
      cxd.data[(x + y * cxd.width) * 4] = p
      cxd.data[(x + y * cxd.width) * 4 + 1] = p
      cxd.data[(x + y * cxd.width) * 4 + 2] = p
    }
  }
  return cxd
}

module.exports = command