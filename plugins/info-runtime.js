const moment = require('moment-timezone')
const { exec } = require('child_process')

let handler = async (m, { conn, args, command }) => {
    let timeh
    if (process.send) {
        process.send('uptime')
        timeh = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000) 
        }) * 1000
    }

    const getUptime = () => {
        return new Promise((resolve, reject) => {
            exec('uptime', (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    };

    let muptime = clockString(timeh)

    try {
        const uptimeResult = await getUptime();
        conn.sendFooter(m.chat, `*乂 Aktif selama*\n\n${uptimeResult}`, `${global.set.wm3}`, m);
    } catch {
    try {
        conn.sendFooter(m.chat, `*乂 Aktif selama*\n\n${muptime}`, `${global.set.wm3}`, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Terjadi kesalahan saat mengambil informasi uptime', m);
    }
  }
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = ['runtime', 'rt']

module.exports = handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Hari* ', h, ' *Jam* ', m, ' *Menit* ', s, ' *Detik*'].map(v => v.toString().padStart(2, 0)).join('')
}