const { BingApi, apikeybing } = require('../lib/scraper/bingimg.js')
const bingApi = new BingApi(apikeybing)

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'Seorang anak laki laki yang sedang berada di depan komputer'))
m.react("🕒")

let teksu = text.replace(/loli/gi, "anak gadis kecil")

try {
const imagesUrls = await bingApi.createImages(teksu + ". Anime Style ultra, HD Anime Style, 4K Anime Style, Anime Style, High quality, Ultra grapics, HD Cinematic, anime, 4K resolution, HD quality, Ultra CGI, High quality, Ultra grapics, HD Cinematic", false)
const totalCount = imagesUrls.length
const credits = await bingApi.getCredits()

if (totalCount > 0) {
for (let i = 0; i < totalCount; i++) {

try {
await new Promise(resolve => setTimeout(resolve, i * 6000))
conn.sendMessage(m.chat, { image: { url: imagesUrls[i] }, caption: `Image *(${i + 1}/${totalCount})*\n\nRemaining Credits: ${credits}\nPrompt: ${text}` }, { quoted: m })

} catch (error) {
console.log(`Error sending file: ${error.message}`)
await m.reply(`Failed to send image *(${i + 1}/${totalCount})*`)
}
}

} else {
await m.reply('No images found after filtering.')
}

} catch (error) {
await m.reply('An error occurred while processing the request.')
}

}
handler.help = ['bingimg']
handler.tags = ['ai']
handler.command = /^(bingimg|bingimage)$/i
handler.premium = true

module.exports = handler