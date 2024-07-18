const { twitter } = require('../lib/scraper/twitter.js')

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'https://twitter.com/gofoodindonesia/status/1229369819511709697'))
m.react("🕒")

try {
let { video } = await twitter(text)
conn.sendFile(m.chat, video, 'twitter.mp4', `Done >,<`, m)

} catch (e) {
m.reply(`Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan`)
}
}
handler.help = ['twitter']
handler.tags = ['downloader']
handler.command = /^(twitter|twit|twitterdl)$/i
handler.limit = true

module.exports = handler