const fs = require('fs')
const fetch = require('node-fetch')

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
if (!pesan) throw 'teksnya??'
m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai Dalam ${anu.length * 0.5} Detik`)

for (let dims of anu) {
conn.sendFooter(dims, `${pesan}`, `${global.botdate}`, fake)
//await conn.reply(dims, `${pesan}`, fake);
}
m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(broadcastgc|bcgc)$/i

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