const { Anime } = require("../lib/scraper/animelist.js")

let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukan Judul Animenya!!`

  let res = await Anime(text)
  
  res = res.map((v) => `*Title:* ${v.title}\n*Type:* ${v.type}\n*Score:* ${v.score}\n*Episode:* ${v.episode}\n*Thumbnail:* ${v.thumbnail}\n*Link:* ${v.url}`).join`\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
  conn.reply(m.chat, res, m)
  }
handler.help = ['animelist']
handler.tags = ['anime']
handler.command = /^(animelist)$/i
handler.limit = true

module.exports = handler