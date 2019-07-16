const { Script } = require('vnftjs')
const axios = require('axios')

const scout = new Script()

scout.funct = b => {
  b.on('message', async message => {
    if (message.content) {
      let emojis = message.content.match(/<(a|):.*?:.*?>/g)
      if (!emojis) {
        return false
      }
      if (!Array.isArray(emojis)) {
        emojis = [emojis]
      }
      for (let emoji of emojis) {
        await axios.get(`https://api.vnft.cc/emoji/add/${emoji}`)
      }
    }
  })
}

module.exports = scout
