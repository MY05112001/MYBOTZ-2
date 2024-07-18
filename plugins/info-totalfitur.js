let handler = async (m, { conn, args, command }) => {
let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length
conn.sendFooter(m.chat, `Total fitur mari saat ini adalah ${totalf}`, `${global.set.wm3}`, m)
}
handler.help = ['totalfeatures']
handler.tags = ['info']
handler.command = /^(total(fitur|feature)?)$/i

module.exports = handler
