let { webp2mp4 } = require('../lib/webp2mp4')
let { ffmpeg } = require('../lib/converter')

let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'Reply sticker or audio!'
    let mime = m.quoted.mimetype || ''
    if (!/webp|audio/.test(mime)) throw `Mime *${mime}* tidak support`
    m.react("🕒")

    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        out = await webp2mp4(media)
    } else if (/audio/.test(mime)) {
        out = await ffmpeg(media, [
            '-filter_complex', 'color',
            '-pix_fmt', 'yuv420p',
            '-crf', '51',
            '-c:a', 'copy',
            '-shortest'
        ], 'mp3', 'mp4')
    }
    await conn.sendFile(m.chat, out, 'out.mp4', `Done Kak ✅`, m)
}
handler.help = ['tovideo']
handler.tags = ['sticker']
handler.command = ['tovideo', 'tovid']

module.exports = handler