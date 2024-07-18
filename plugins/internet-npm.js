let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'canvafy'))
m.react("🕒")

let res = await Funct.fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()
if (!objects.length) throw `Hasil pencarian dari "${text}" tidak di temukan!`
let txt = objects.map(({ package: pkg }) => {
return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
}).join`\n\n`
m.reply(txt)
}
handler.help = ['npmsearch']
handler.tags = ['internet']
handler.command = /^npmsearch$/i
handler.limit = true

module.exports = handler