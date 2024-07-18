const canvafy = require('canvafy')
const { spotifydl } = require("../lib/scraper/spotifydl.js")

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'https://open.spotify.com/track/66apUbHsEuKh7IqkKK7OKa?si=Pk6W_kbQSrqolYhnXRXiOg'))
m.react("🕒")

try{
let { title, track, artis, durasi, image, download } = await spotifydl(text);

let captionvid = `*乂 Spotify Download*\n\n∘ *Title :* ${title}\n∘ *Artist :* ${artis}\n∘ *Duration :* ${durasi}*\n∘ *Link :* ${download}\n\n_Sending audio please wait..._`
let urllll = text

const aku = await new canvafy.Spotify()
            .setTitle(title)
            .setAuthor("Spotify Downloader")
            .setTimestamp(40, 100)
            .setOverlayOpacity(0.8)
            .setBorder("#fff", 0.8)
            .setImage(image)
            .setBlur(3)
            .build();
let yy = await conn.sendFile(m.chat, aku, '', captionvid, m); 

await conn.sendMessage(m.chat, { audio: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`, ptt: false }, { quoted: yy });

} catch {
return `Can't get media data`
}

}
handler.command = handler.help = ['spotifydl']
handler.tags = ['downloader']
handler.limit = true

module.exports = handler

/** 
    * Powered By Dims
    * Github: https://github.com/Im-Dims
    * Wa: https://wa.me/6281398274790
    * Wm Jangan di hapus ataupun di ubah!
**/