const { googleImage } = require('@bochilteam/scraper')

const handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'Tensei shitara ken deshita'))
m.react("🕒")

// Anti nsfw
if (['tetek', 'segs', 'hentai', 'bokep', 'tobrut', 'kontol', 'memek', 'sange', 'tete', 'nenen', 'nyepong', 'telanjang'].some(word => text.includes(word))) {
return conn.reply(m.chat, Func.texted('bold', `Sorry sensei the search results you are looking for contain 18+`), m)
}

if (['Tetek', 'Segs', 'Hentai', 'Bokep', 'Tobrut', 'Kontol', 'Memek', 'Sange', 'Tete', 'Nenen', 'Nyepong', 'Telanjang'].some(word => text.includes(word))) {
return conn.reply(m.chat, Func.texted('bold', `Sorry sensei the search results you are looking for contain 18+`), m)
}

const res = await googleImage(text)
let image = pickRandom(res)
let link = image
conn.sendFile(m.chat, link, 'google.jpg', `*乂 Google Image*\n\n∘ *Result:* ${text}\n∘ *Source:* https://google.com`, m)
}
handler.help = ['gimage <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}