let fetch = require('node-fetch')
let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (m.quoted) {
    await conn.groupAdd(m.chat, [m.quoted.sender]).catch((_) => _)
  }
  if (!text) return m.reply(Func.example(usedPrefix, command, '62xxxx'))
  let _participants = participants.map((user) => user.jid)
  let users = (await Promise.all(text.split(',').map(v => v.replace(/[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net')).map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
  let response = await conn.query({tag: 'iq', attrs: { type: 'set', xmlns: 'w:g2', to: m.chat }, content: users.map(jid => ({ tag: 'add', attrs: {}, content: [{ tag: 'participant', attrs: { jid } }] })) })
  if (response[users] == 408)
    return m.reply(Func.texted('italic', `Gagal Nomor tersebut telah keluar baru baru ini hanya bisa masuk lewat *${usedPrefix}linkgc* grup`))
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
  let jpegThumbnail = pp ? await (await fetch(pp)).buffer() : false
  for (let user of response.participants.filter((user) => Object.values(user)[0].code == 403)) {
    let [[jid, { invite_code, invite_code_exp }]] = Object.entries(user)
    let teks = `Mengundang @${jid.split`@`[0]} menggunakan invite...`
    m.reply(teks, null, { contextInfo: { mentionedJid: conn.parseMention(teks) }})
    await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, false, 'Invitation to join my WhatsApp group', jpegThumbnail ? { jpegThumbnail } : {})
  }
}
handler.help = handler.command = ['add']
handler.tags = ['group']
handler.group = handler.admin = handler.botAdmin = handler.limit = true

module.exports = handler