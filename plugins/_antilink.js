let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let handler = m => m

handler.before = async function (m, { user, isBotAdmin, isAdmin, isOwner }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antilink && isGroupLink) {
    await conn.sendFooter(m.chat, `Terdektesi *${m.name}* telah mengirim link group lain!!\n\nSopan kah begitu mengirim link group lain tanpa izin??`, `${global.set.wm3}`, m)

    if (isAdmin) return m.reply(Func.texted('bold', 'Ehh gak jadi deh... kamu admin ternyata'))
    if (!isBotAdmin) return m.reply(Func.texted('italic', 'Aku aja bukan admin-_'))
    if (isOwner) return m.reply(Func.texted('bold', 'Ehh gak jadi deh... kamu ownerku ternyata'))

    conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
    //await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler