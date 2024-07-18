const { uploadPomf2 } = require("../lib/scraper/uploadPomf2.js")

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Tidak ada media yang ditemukan'
let media = await q.download()
const result = await uploadPomf2(media)

try {
m.reply(`*Uploader Pomf2*

*Name:* ${result.files[0].name}
*Link:* ${result.files[0].url}
*Size:* ${result.files[0].size}
*Expired:* Not expired date`)

} catch (e) {
m.reply(e)
}

}
handler.help = ['up']
handler.tags = ['tools']
handler.command = /^(up)$/i
handler.limit = true

module.exports = handler