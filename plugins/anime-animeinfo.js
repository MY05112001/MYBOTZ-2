let handler = async(m, { usedPrefix, command, text }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'Tensei shitara ken deshita'))

let ah = await Func.fetchJson(`https://api.jikan.moe/v4/anime?q=${text}`)
let { title, members, synopsis, episodes, url, rated, score, image_url, type, start_date, end_date } = ah.data[0]
let animeingfo = `*乂 Anime Info*

∘ *Title:* ${title}
∘ *Episodes:* ${episodes}
∘ *Start date:* ${start_date}
∘ *End date:* ${end_date}
∘ *Show Type:* ${type}
∘ *Rating:* ${rated}
∘ *Score:* ${score}
∘ *Members:* ${members}
∘ *Synopsis:* ${synopsis}
∘ *Url*: ${url}`
conn.sendFile(m.chat, ah.data[0].images.jpg.image_url, '', animeingfo, m)
}
handler.help = ['animeinfo <judul>']
handler.tags = ['anime']
handler.command = /^(animeinfo)$/i
handler.limit = true

module.exports = handler
