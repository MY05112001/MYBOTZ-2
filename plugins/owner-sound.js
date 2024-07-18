let { generateWAMessageFromContent } = require('@whiskeysockets/baileys')
let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command, participants }) => {
if (command == 'senbonzakura') {
let media = await( await fetch(`https://github.com/Im-Dims/Sound/raw/main/bangkai.mp3?raw=true`)).buffer()
conn.sendMessage(m.chat, { audio: media, mentions: participants.map(a => a.id) })

} else if (command == 'minazuki') {
let media = await( await fetch(`https://github.com/Im-Dims/Sound/raw/main/Bankai_Minazuki.mp3?raw=true`)).buffer()
conn.sendMessage(m.chat, { audio: media, mentions: participants.map(a => a.id) })
}
}
handler.help = handler.command = ['senbonzakura', 'minazuki']
handler.tags = ['owner']
handler.owner = true

module.exports = handler