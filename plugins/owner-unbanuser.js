let handler = async (m, { conn, text }) => {
if (!text) throw 'Umhh siapa yang mau di unban??'

let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw 'Tag??'
let users = global.db.data.users
users[who].banned = false
users[who].warn = 0
conn.reply(m.chat, 'Sukses Sayang >,<', m)
}
handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban(user)?$/i
handler.owner = true

module.exports = handler