const { MediaFireDl } = require("../lib/scraper/mediafire.js")

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file'))
if (!/https?:\/\/(www\.)?mediafire\.com/.test(args[0])) m.reply(Func.example(usedPrefix, command, 'https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file'))
m.react("🕒")

try {
let res = await MediaFireDl(args[0])

const cap = `*乂 MediaFire*

∘ *Name:* ${res.filename}
∘ *Size:* ${res.filesize}
∘ *Type:* ${res.filetype}
∘ *UploadAt:* ${res.uploadAt}
∘ *Link:* ${res.link}`
await conn.sendMessage(m.chat, { document: { url: res.link }, fileName: `${res.filename + res.filetype}`, mimetype: `${res.filetype}`, caption: `${cap}` }, { quoted: m })

} catch (e) {
m.reply(`Terjadi Kesalahan, Tidak Dapat Mengambil Data Atau Ukuran File Terlalu Besar`)
}
}
handler.help = ['mediafire']
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i
handler.limit = true

module.exports = handler