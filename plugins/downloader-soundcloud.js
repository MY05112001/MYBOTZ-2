const { SoundCloudDl } = require("../lib/scraper/SoundCloudDl.js")

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya mana?\nExample: .soundcloud https://soundcloud.com/doom-official-45631102/dj-asmalibrasi`
m.reply(global.status.wait)

let res = await SoundCloudDl(text)
//let thumb = await(await conn.getFile(res.img)).data
let capt = `*乂 Downloader Sound Cloud*

*Title:* ${res.title}
*Link:* ${text}

Audio tidak ada suara??, Download sendiri jangan manja
*Url:* ${res.link}`

let loliii = await conn.sendMessage(m.chat, { text: capt, contextInfo: { externalAdReply: { title: res.title, body: null, thumbnailUrl: res.img, sourceUrl: text, mediaType: 1, renderLargerThumbnail: false }}}, { quoted:m });
conn.sendMessage(m.chat, { audio: { url: res.link }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`, ptt: false }, { quoted: loliii });
}
handler.help = ['soundcloud']
handler.tags = ['downloader']
handler.command = /^(soundcloud)$/i
handler.limit = true

module.exports = handler