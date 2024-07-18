const user = 500
const limit = 15
const balance = 100
const exp = 1000

let handler = async (m, { isPrems }) => {
let time = global.db.data.users[m.sender].lastclaim + 86400000
if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) throw `Kamu Sudah Mengambilnya Hari Ini\nTunggu Selama ${msToTime(time - new Date())} Lagi`
global.db.data.users[m.sender].balance += balance
global.db.data.users[m.sender].exp += exp
global.db.data.users[m.sender].limit += limit

conn.sendFooter(m.chat, `Selamat Kamu Mendapatkan:\n\n+${limit} Limit\n+${exp} Exp\n+${balance} Balance`, `${global.set.wm3}`, m)
global.db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(claim|klaim)$/i

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    monthly = Math.floor((duration / (1000 * 60 * 60 * 24)) % 720)

  monthly  = (monthly < 10) ? "0" + monthly : monthly
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return monthly + " Hari " +  hours + " Jam " + minutes + " Menit"
}