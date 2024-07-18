let fetch = require('node-fetch')
let googleIt = require('google-it')

let handler = async (m, { conn, usedPrefix, command, args }) => {
let full = /f$/i.test(command)
let text = args.join` `

if (!text) return m.reply(Func.example(usedPrefix, command, 'Hari lahir soekarno'))
let url = 'https://google.com/search?q=' + encodeURIComponent(text)
let search = await googleIt({ query: text })
let msg = search.map(({ title, link, snippet}) => {
return `*${title}*\n_${link}_\n_${snippet}_`
}).join`\n\n`

try {
var logos = 'https://telegra.ph/file/3733b7dc317daae43b119.jpg'
conn.sendFile(m.chat, logos, 'logos.jpg', url + '\n\n' + msg, m)
} catch (e) {
m.reply(msg)
}
}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.limit = 2

module.exports = handler