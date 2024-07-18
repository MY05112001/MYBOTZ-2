let levelling = require('../lib/levelling')

let handler = async (m, { usedPrefix, command, text, args }) => {
  try {
    var pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
    var pp = './src/pp.png'
  } finally {
    let setting = db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(setting.level, global.multiplier)
    let pme = `*乂 Your Profile*\n\n`
    pme += `*User Info*\n`
    pme += `∘ *Name* : ${conn.getName(m.sender)} ${setting.registered ? '(' + setting.name + ') ' : ''}\n`
    pme += `∘ *Pasangan* : ${setting.pasangan ? ` @${setting.pasangan.split`@`[0]}` : '×'}\n`
    pme += `∘ *Exp* : ${Func.formatNumber(setting.exp)} (${setting.exp - min} / ${xp})\n`
    pme += `∘ *Level* : ${setting.level}\n`
    pme += `∘ *Role* : ${setting.role}\n`
    pme += `∘ *Limit* : ${Func.formatNumber(setting.limit)}\n`
    pme += `∘ *Money* : ${Func.formatNumber(setting.money)}\n\n`
    pme += `*User Status*\n`
    pme += `∘ *Register* : ${setting.registered ? "√" : "×"}\n`
    pme += `∘ *Premium* : ${setting.premium ? "√" : "×"}\n`
    pme += `∘ *Expired* : ${setting.premiumTime - new Date() * 1 > 1 ? Func.toDate(setting.premiumTime - new Date() * 1) : "-"}\n`
    pme += `∘ *Banned* : ${setting.banned ? "√" : "×"}`
    conn.sendMessage(m.chat, { image: await Func.fetchBuffer(pp), caption: pme }, { quoted : m })
  }
}
handler.help = handler.command = ['me']
handler.tag = ['xp']

module.exports = handler