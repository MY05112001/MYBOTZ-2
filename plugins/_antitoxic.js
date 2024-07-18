let istoxic = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole|Asu|asu|Kntl|Kontol|kntl|Anj4g/i // tambahin sendiri
let handler = m => m

handler.before = function (m, { isOwner, isBotAdmin }) {
    if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    const isantitoxic = istoxic.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id
    if (chat.antitoxic && isantitoxic) {
        m.reply(`*Terdeteksi @${m.sender.replace(/@.+/g, '')} menggunakan kata kasar!*\nMaaf kak harus saya hapus, Karna admin mengaktifkan anti toxic :)`)
            return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }
    return !0
}
