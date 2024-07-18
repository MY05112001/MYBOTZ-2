const { GDriveDl } = require("../lib/scraper/gdrive.js")

let handler = async (m, { conn, args }) => {
if (!args[0]) throw 'Linknya?' 
conn.reply(m.chat, "Sedang mengdowload....", m);

GDriveDl(args[0]).then(async (res) => {
if (!res) throw res
await m.reply(JSON.stringify(res, null, 2))
conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
})
}
handler.help = ['gdrive']
handler.tags = ['downloader']
handler.command = /^(gdrive)$/i
handler.limit = true

module.exports = handler