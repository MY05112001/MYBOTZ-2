const jlimit = 50
const blimit = 100

let handler  = async (m, { conn, command, args, usedPrefix }) => {
let type = (args[0] || '').toLowerCase()
let _type = (args[1] || '').toLowerCase()
let jualbeli = (args[0] || '').toLowerCase()

const chatnya = `Apa yang mau di beli/jual ?

*Contoh :*
.jual limit
Untuk Menjual Limit

.buy limit
Untuk Membeli Limit`.trim()

    try {
        if (/jual|sell/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
                switch (type) {                  
                     case 'limit':
                        if (global.db.data.users[m.sender].limit >= count * 1) {
                            global.db.data.users[m.sender].balance += jlimit * count
                            global.db.data.users[m.sender].limit -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Limit Dengan Harga ${jlimit * count} balance`.trim(), m)
                        } else conn.reply(m.chat, `Limit Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'balance':
                        if (global.db.data.users[m.sender].balance >= count * 1) {
                            global.db.data.users[m.sender].xp += jlimit * count
                            global.db.data.users[m.sender].balance -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} balance Dengan Harga ${jlimit * count} Xp`.trim(), m)
                        } else conn.reply(m.chat, `Balance Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'xp':
                        if (global.db.data.users[m.sender].xp >= count * 1) {
                            global.db.data.users[m.sender].balance += jlimit * count
                            global.db.data.users[m.sender].xp -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${count} Xp Dengan Harga ${jlimit * count} balance`.trim(), m)
                        } else conn.reply(m.chat, `Xp Kamu Tidak Cukup`.trim(), m)
                        break
                    default:
                        return conn.reply(m.chat, chatnya, m)
                }
        } else if (/beli|buy|/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) { 
                       case 'limit':
                     if (global.db.data.users[m.sender].balance >= blimit * count) {
                            global.db.data.users[m.sender].balance -= blimit * count
                            global.db.data.users[m.sender].limit += count * 1
                            conn.reply(m.chat, `Sukses Membeli ${count} Limit Dengan Harga ${blimit * count} balance`.trim(), m)
                        } else conn.reply(m.chat, `Balance Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'balance':
                     if (global.db.data.users[m.sender].xp >= blimit * count) {
                            global.db.data.users[m.sender].xp -= blimit * count
                            global.db.data.users[m.sender].balance += count * 1
                            conn.reply(m.chat, `Sukses Membeli ${count} Limit Dengan Harga ${blimit * count} balance`.trim(), m)
                        } else conn.reply(m.chat, `Xp Kamu Tidak Cukup`.trim(), m)
                        break
                        default:
                    return conn.sendFooter(m.chat, chatnya, 'Ketik *.infoshop* untuk melihat tutorial atau\nClick here: https://wa.me/6285757741408?text=.infoshop', m)
            }
        }
    } catch (e) {
        conn.sendFooter(m.chat, chatnya, 'Ketik *.infoshop* untuk melihat tutorial atau\nClick here: https://wa.me/6285757741408?text=.infoshop', m)
        console.log(e)
    }
}

handler.help = ['jual', 'beli', 'buy']
handler.tags = ['xp']
handler.command = /^(jual|beli|buy)$/i

module.exports = handler