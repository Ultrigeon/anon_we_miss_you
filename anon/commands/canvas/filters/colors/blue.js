const FilterCommand = require('../FilterCommand')

const command = new FilterCommand(filter)
command.name = 'blue'

function filter(cxd) {
  let subPixelCount = Object.keys(cxd.data).length
  for (let i = 0; i < subPixelCount; i += 4) {
    cxd.data[i + 0] = 0
    cxd.data[i + 1] = 0
  }
  return cxd
}

module.exports = command