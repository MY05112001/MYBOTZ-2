const { animeVideo, animeVideo2 } = require("../lib/scraper/storynimek.js")

let handler = async(m, { conn, command }) => {
try {
m.react("🕒")

if (command == 'storyanime') {
let anime = await animeVideo()
let cap = anime.title
await conn.sendFile(m.chat, anime.source, "", cap, m)

} else if (command == 'storyanime2') {
let resl = await animeVideo2()
let cap = `Nih Kak Videonya`
await conn.sendFile(m.chat, resl.source, "", cap, m)
}

} catch (e) {
console.log(e)
m.reply(Func.jsonFormat(e))
}
}
handler.help = handler.command = ['storyanime', 'storyanime2']
handler.tags = ['anime']
handler.limit = true

module.exports = handler