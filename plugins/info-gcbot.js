const fs = require("fs")
const moment = require('moment-timezone')

let handler = async (m, { conn, args, command }) => {
let anuu = `Hai @${m.sender.replace(/@.+/g, '')} sensei ${ucapan()}

Sensei mau join ke group' @0 official aku??
_klik button du bawah yaa makasih>,<_`
let sgc = db.data.settings[conn.user.jid].link

conn.reply(m.chat, anuu, m, {
contextInfo: {
mentionedJid: ['0@s.whatsapp.net', m.sender],
externalAdReply: {
mediaUrl: '',
mediaType: 2,
description: null,
title: `Jangan lupa gabung ya kak >,<`,
body: null,
previewType: 0,
thumbnail: fs.readFileSync("./src/thumbnail.jpg"),
sourceUrl: sgc
}
}
});

}
handler.help = ['gcbot']
handler.tags = ['info']
handler.command = ['gcbot', 'groupbot']

module.exports = handler


function ucapan() {
  let time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat dinihari"
  if (time >= 4) res = "Selamat pagi"
  if (time > 10) res = "Selamat siang"
  if (time >= 15) res = "Selamat sore"
  if (time >= 18) res = "Selamat malam"
  return res
}