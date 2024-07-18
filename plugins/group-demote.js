const { areJidsSameUser } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, text, args, participants }) => {
  if (m.quoted) {
    if (m.quoted.sender === conn.user.jid)
      return conn.reply(m.chat, `Jangan Saya Lah -_`, m);

    let user = m.quoted.sender;
    try {
      await Func.delay(1000);
      await conn.groupParticipantsUpdate(m.chat, [user], "demote");
      conn.reply(m.chat, `Sukses Sayang, Sekarang @${(user || "").replace(/@s\.whatsapp\.net/g, "")} Bukan Admin Lagi.`, null, { mentions: [user] }, m);

    } catch (e) {
      console.log(e);
      let user = m.quoted.sender;
      await conn.reply(m.chat, `Gagal Demote @${(user || "").replace(/@s\.whatsapp\.net/g, "")}`, null, { mentions: [user] }, m);
    }
  } else {
    if (!text) return conn.reply(m.chat, `*@tag* atau *reply* yang ingin di demote sayang`, m);
    try {
      let users = m.mentionedJid.filter((u) => !areJidsSameUser(u, conn.user.id));
      let users2 = [`${users[0]}`];
      for (let user of users2) {
        if (user.endsWith("@s.whatsapp.net") && !(participants.find((v) => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
          await Func.delay(1000);
          const res = await conn.groupParticipantsUpdate(m.chat, [user], "demote");
          conn.reply(m.chat, `Sukses Sayang, Sekarang @${(user || "").replace(/@s\.whatsapp\.net/g, "")} Bukan Admin Lagi.`, null, { mentions: [user] }, m);
        }
      }
    } catch (e) {
      console.log(e);
      let user = m.mentionedJid[0];
      conn.reply(m.chat, `Gagal Demote @${(user || "").replace(/@s\.whatsapp\.net/g, "")}`, null, { mentions: [user] }, m);
    }
  }
};

handler.help = ["demote"];
handler.tags = ["group"];
handler.command = /^(demote)$/i;

handler.admin = true;
handler.botAdmin = true;
handler.group = true;

module.exports = handler;