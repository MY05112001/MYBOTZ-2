let handler = async (m, { usedPrefix, command, text }) => {
let ar = Object.keys(plugins)
let ar1 = ar.map(v => v.replace('.js', ''))
if (!text) throw `Uhm.. teksnya mana?\n\nContoh:\n${usedPrefix + command} main-menu`
if (!ar1.includes(text)) return m.reply(`'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
m.reply(require('fs').readFileSync('./plugins/' + text + '.js', 'utf-8'))
}
handler.help = ['getplugin'].map(v => v + ' ')
handler.tags = ['owner']
handler.command = ['gp', 'getplugin']
handler.owner = true

module.exports = handler