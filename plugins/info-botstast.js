const fs = require('fs')

let handler = async (m, { conn }) => {
  let setting = db.data.settings[conn.user.jid]
  const chats = Object.keys(await conn.chats)
  const groups = Object.keys(await conn.groupFetchAllParticipating())
  const block = await conn.fetchBlocklist()
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let cot = `*Status ${global.set.namebot}*\n\n
  *Status*\n
  ∘ *${groups.length}* Grup Joined\n
  ∘ *${chats.length - groups.length}* Private Chats\n
  ∘ *${Object.keys(db.data.users).length}* User in Database\n
  ∘ *${block == undefined ? '0' : block.length}* User Blocked\n
  ∘ *${Object.entries(db.data.chats).filter((chat) => chat[1].isBanned).length}* Chats Banned\n
  ∘ *${Object.entries(db.data.users).filter((user) => user[1].banned).length}* Users Banned\n
  ∘ *Runtime* : ${uptime}\n\n
  *System*\n
  ∘ ${setting.anticall ? '*[ √ ]*' : '*[ × ]*'}  Anti Call\n
  ∘ ${setting.autoread ? '*[ √ ]*' : '*[ × ]*'}  Auto Read\n
  ∘ ${setting.autoreset ? '*[ √ ]*' : '*[ × ]*'}  Auto Reset\n
  ∘ ${setting.grouponly ? '*[ √ ]*' : '*[ × ]*'}  Group Mode\n
  ∘ ${setting.game ? '*[ √ ]*' : '*[ × ]*'}  Game Mode\n
  ∘ ${setting.rpg ? '*[ √ ]*' : '*[ × ]*'}  Rpg Mode`
await m.reply(cot)
}
handler.help = ['status']
handler.tags = ['info']
handler.command = ['stats', 'status', 'stat', 'botstat']
module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':')
}
