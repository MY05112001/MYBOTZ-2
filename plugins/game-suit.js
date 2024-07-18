let handler = async (m, { text, usedPrefix }) => {
    let salah = `Pilihan Yang Tersedia\n\nGunting, Kertas, Batu\n\n${usedPrefix}suit gunting\n\nKasih Spasi!`
    if (!text) throw salah
    var netral = Math.random()

    if (netral < 0.34) {
        netral = 'batu' 
    } else if (netral > 0.34 && netral < 0.67) {
        netral = 'gunting' 
    } else {
        netral = 'kertas'
    }

    //menentukan rules
    if (text == netral) {
        m.reply(`*Seri!*\n\nKamu: ${text}\nBot: ${netral}`)
    } else if (text == 'batu') {
        if (netral == 'gunting') {
            global.db.data.users[m.sender].money += 1000
            conn.sendFooter(m.chat, `*Kamu Menang!*\n\nKamu: ${text}\nBot: ${netral}\n\nBonus: +1000 money`, `${global.set.wm3}`, m)
        } else {
            conn.sendFooter(m.chat, `*Kamu Kalah!*\n\nKamu: ${text}\nBot: ${netral}`, `${global.set.wm3}`, m)
        }
    } else if (text == 'gunting') {
        if (netral == 'kertas') {
            global.db.data.users[m.sender].money += 1000
            conn.sendFooter(m.chat, `*Kamu Menang!*\n\nKamu: ${text}\nBot: ${netral}\n\nBonus: +1000 money`, `${global.set.wm3}`, m)
        } else {
            conn.sendFooter(m.chat, `*Kamu Kalah!*\n\nKamu: ${text}\nBot: ${netral}`, `${global.set.wm3}`, m)
        }
    } else if (text == 'kertas') {
        if (netral == 'batu') {
            global.db.data.users[m.sender].money += 1000
            conn.sendFooter(m.chat, `*Kamu Menang!*\n\nKamu: ${text}\nBot: ${netral}\n\nBonus: +1000 money`, `${global.set.wm3}`, m)
        } else {
            conn.sendFooter(m.chat, `*Kamu Kalah!*\n\nKamu: ${text}\nBot: ${netral}`, `${global.set.wm3}`, m)
        }
    } else {
        throw salah
    }
}
handler.help = ['suit']
handler.tags = ['game']
handler.command = /^(suit)$/i
handler.limit = true

module.exports = handler
