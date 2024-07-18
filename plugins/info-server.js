const os = require('os')

let handler = async (m, { conn }) => {
  try {
    const json = await Func.fetchJson('http://ip-api.com/json')
    delete json.status
    let caption = `*乂 Server*\n\n`
    caption += `∘ OS : ${os.type()} (${os.arch()} / ${os.release()})\n`
    caption += `∘ Ram : ${Func.formatSize(process.memoryUsage().rss)} / ${Func.formatSize(os.totalmem())}\n`
    for (let key in json) caption += `∘ ${Func.ucword(key)} : ${json[key]}\n`
    caption += `∘ Uptime : ${Func.toTime(os.uptime * 1000)}\n`
    caption += `∘ Processor : ${os.cpus()[0].model}`
    conn.sendMessageModify(m.chat, caption, m, { largeThumb: true })
  } catch(e) {
    return m.reply(String(e))
  }
}
handler.help = ['server']
handler.tags = ['info']
handler.command = /^(server)$/i

module.exports = handler