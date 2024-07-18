const fs = require("fs")

let handler = async (m, { conn, text, command }) => {
if (command == 'getsessi') {
m.reply('Tunggu Sebentar, Proses Getting File sessions/creds.json')
let sesi = await fs.readFileSync('./sessions/creds.json')
return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
} else if (command == 'getsessiauth') {
m.reply('Tunggu Sebentar, Proses Getting File')
let sesi = await fs.readFileSync('./mari-store.json')
return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'mari-store.json' }, { quoted: m })
}
}
handler.help = handler.command = ['getsessi']
handler.tags = ['owner']
handler.owner = true

module.exports = handler
