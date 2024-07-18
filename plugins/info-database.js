let handler = async (m) => {
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
m.reply(`*Jumlah database saat ini ${totalreg} user*\n*Dan user teregistrasi saat ini ${rtotalreg} user*`)
}
handler.help = ['database']
handler.tags = ['info']
handler.command = /^(database|jumlahdatabase|user)$/i

module.exports = handler