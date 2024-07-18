const { blackboxChat } = require("../lib/scraper/kotakhitam.js")

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'Buatkan kode html home simple'));

    try {
        let result = await blackboxChat(text)
        await conn.reply(m.chat, result, m)
    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'Error: ' + error.message, m)
    }
}
handler.help = ['blackbox']
handler.tags = ['ai']
handler.command = ['blackbox', 'kotakhitam']
handler.level = 10
handler.limit = true

module.exports = handler