const { uploadPomf2 } = require("../lib/scraper/uploadPomf2.js")

let handler = async (m, { conn,isOwner, isROwner, text }) => {
const fake = {
    "key": {
      "remoteJid": "status@broadcast",
      "participant": "0@s.whatsapp.net",
      "fromMe": false,
      "id": ""
    },
    "message": {
      "conversation": "Mari - Wabot Broadcast"
    }
};

const delay = time => new Promise(res => setTimeout(res, time))
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
let pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    
// Upload nya
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Tidak ada media yang ditemukan'
let media = await q.download()
const result = await uploadPomf2(media)

m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai Dalam ${anu.length * 0.5} Detik`)
for (let i of anu) {
conn.sendFile(i, `${result.files[0].url}`, '', null, fake, '', { asSticker: 1 })
}
m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcstik']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(bcstik|bcsticker)$/i

module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }