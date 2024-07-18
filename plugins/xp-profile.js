let levelling = require('../lib/levelling')

let handler = async (m, { usedPrefix, command, args, text }) => {
  let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
  if (!text && !m.quoted) return conn.reply(m.chat, Func.texted('bold', `Mention or Reply chat target.`), m)
  if (isNaN(number)) return conn.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
  if (number.length > 15) return conn.reply(m.chat, Func.texted('bold', `Invalid format.`), m)
  var pic = './src/pp.png'
  try {
    if (text) {
      var user = number + '@s.whatsapp.net'
    } else if (m.quoted.sender) {
      var user = m.quoted.sender
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net'
    }
  } catch (e) {} finally {
    let target = global.db.data.users[user]
    if (typeof target == 'undefined') return conn.reply(m.chat, Func.texted('bold', `Can't find user data.`), m)
    let { min, xp, max } = levelling.xpRange(target.level, global.multiplier)
    let math = max - xp
    try {
      var pic = await conn.profilePictureUrl(user, 'image')
    } catch (e) {} finally {
      let pme = `*乂 Profile Users*\n\n`
      pme += `*User Info*\n`
      pme += `∘ *Name* : ${conn.getName(user)} ${target.registered ? '(' + target.name + ') ': ''}\n`
      pme += `∘ *Pasangan* : ${target.pasangan ? `@${target.pasangan.split`@`[0]}` : '×'}\n`
      pme += `∘ *Exp* : ${Func.formatNumber(target.exp)} (${target.exp - min} / ${xp})\n`
      pme += `∘ *Level* : ${target.level}\n`
      pme += `∘ *Role* : ${target.role}\n`
      pme += `∘ *Limit* : ${Func.formatNumber(target.limit)}\n`
      pme += `∘ *Money* : ${Func.formatNumber(target.money)}\n\n`
      pme += `*User Status*\n`
      pme += `∘ *Register* : ${target.registered ? "√": "×"}\n`
      pme += `∘ *Premium* : ${target.premium ? "√": "×"}\n`
      pme += `∘ *Expired* : ${target.premiumTime - new Date() * 1 > 1 ? Func.toDate(target.premiumTime - new Date() * 1) : "-"}\n`
      pme += `∘ *Banned* : ${target.banned ? "√": "×"}`
      conn.sendMessage(m.chat, { image: await Func.fetchBuffer(pic), caption: pme }, { quoted : m })
    }
  }
}
handler.help = handler.command = ['profile']
handler.tags = ['xp']

module.exports = handler