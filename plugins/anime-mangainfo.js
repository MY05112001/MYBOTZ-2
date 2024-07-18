const { Manga } = require("../lib/scraper/manga.js")

let handler = async(m, { conn, text }) => {
if (!text) throw `Masukan Nama Manganya!!`
  
let res = await Manga(text)
res = res.map((v) => `*Title:* ${v.title}\n*Type:* ${v.type}\n*Volum:* ${v.vol}\n*Score:* ${v.score}\n*Thumbnail:* ${v.thumbnail}\n*Link:* ${v.link}`).join`\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n`
conn.reply(m.chat, res, m)
} 
handler.help = ['mangainfo']
handler.tags = ['anime']
handler.command = /^(mangainfo)$/i
handler.limit = true

module.exports = handler