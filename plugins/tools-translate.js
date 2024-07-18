const defaultLang = 'id'
const { translate } = require("../lib/scraper/translate.js")

let handler = async (m, { args, usedPrefix, command }) => {
if (!args[0] && !m.quoted) {
return m.reply(Func.example(usedPrefix, command, 'id hello word'))
}

let lang = args[0]
let text = args.slice(1).join(' ')

if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
}

if (!text && m.quoted && m.quoted.text) text = m.quoted.text
    
let transl = await translate(text, lang)
m.reply(`Translate to *${lang}*\n\n*Result:*\n${transl[0]}`.trim())
}
handler.help = ['translate']
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

module.exports = handler