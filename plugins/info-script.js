/* let handler = async m => {
teks = `
Name : ${require('../package.json').name}
Version : v${require('../package.json').version}

Repo : ${require('../package.json').homepage}
RestApi : https://api.alyachan.pro`
conn.sendMessageModify(m.chat, teks, m, {
title: 'Moon - Bot',
body: 'hi everybody',
largeThumb: true,
url: 'https://github.com/Nando35/moon-bot'
})
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = ['sc', 'sourcecode']

module.exports = handler */

let handler = async (m, { conn }) => {
await conn.sendSticker(m.chat, "https://telegra.ph/file/9de5d8274e114aedbde7e.jpg", m, { packname: global.set.packname, author: global.set.author })
}
//handler.help = ['sc']
//handler.tags = ['sticker']
handler.command = /^(sc|script|sourcecode)$/i

module.exports = handler