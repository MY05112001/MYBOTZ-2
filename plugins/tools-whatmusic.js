const acrcloud = require('acrcloud')

let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c9f2fca5e16a7986b0a6c8ff70ed0a06',
access_secret: 'PQR9E04ZD60wQPgTSRRqwkBFIWEZldj0G3q7NJuR'
})

let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
conn.sendFooter(m.chat, "Sedang mencari lagu yang ingin kamu cari....", "Jangan lupa support terus bot kami akan terus semakin berkembang", m)
if (/video|audio/.test(mime)) {
	let buffer = await q.download()
	let { status, metadata } = await acr.identify(buffer)
	if (status.code !== 0) throw status.msg 
	let { title, artists, album, genres, release_date } = metadata.music[0]
	let txt = `*乂 What Music*\n\n`
		txt += `∘ *Title:* ${title}${artists ? `\n∘ *Artists:* ${artists.map(v => v.name).join(', ')}` : ''}`
		txt += `${album ? `\n∘ *Album:* ${album.name}` : ''}${genres ? `\n∘ *Genres:* ${genres.map(v => v.name).join(', ')}` : ''}\n`
		txt += `∘ *Release Date:* ${release_date}`
		conn.sendFooter(m.chat, txt.trim(), `*Note:* Jika ingin memutar musicnya cukup ketik ${usedPrefix}play ${title}`, m)
	} else throw `Reply audio/video with command ${usedPrefix + command}`
}
handler.help = handler.command = ['whatmusic']
handler.tags = ['tools']
handler.limit = true

module.exports = handler