const { ssweb } = require("../lib/scraper/ssweb.js")

let handler = async (m, { conn, text, command, usedPrefix }) => {
if (!text) return m.reply(`Silahkan masukan url, Contoh: ${usedPrefix + command} https://github.com/Im-Dims\n\nList type yang tersedia:\nssweb\nsstablet\nsspc\nsshp`)
m.reply("_Sebentar. . ._")

var phone = await ssweb(text, 'phone')
var desktop = await ssweb(text, 'desktop')
var tablet = await ssweb(text, 'tablet')
var res = ``

if (command === 'sshp') {
await conn.sendFile(m.chat, phone.result, '', res, m, false)
}
if (command === 'ssweb' || command === 'sstablet') {
await conn.sendFile(m.chat, tablet.result, '', res, m, false)
}
if (command === 'sspc') {
await conn.sendFile(m.chat, desktop.result, '', res, m, false)
}

}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^(ssweb|sstablet|sspc|sshp)$/i
handler.limit = true

module.exports = handler 