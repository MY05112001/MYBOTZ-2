let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `Silahkan masukan laporan kamu\n\nContoh: ${usedPrefix + command} Lapor pengguna mengirim foto bokep tolong di tindak.`, m)
if (text > 300) return conn.reply(m.chat, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', m)
var nomor = m.sender
const teks1 = `*乂 Report*\n,\nNomor : wa.me/${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${text}`
conn.reply(owner[0] + '@s.whatsapp.net', teks1, m)
conn.reply(m.chat, 'Masalah berhasil dikirimkan ke Owner', m)
}
handler.help = ['report']
handler.tags = ['info']
handler.command = /^(report|lapor)$/i

module.exports = handler
