// SC BY YOSH
// WA: 088980818668
// https://bit.ly/lvynpc



let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
conn.listAfk = conn.listAfk || {};
    try {
        let user = global.db.data.users[m.sender]
        user.afk = +new Date();
        user.afkReason = text;
        const username = m.name || m.pushName;
        const id = m.sender || m.key.remoteJid;

conn.listAfk[m.chat] = conn.listAfk[m.chat]
  ? conn.listAfk[m.chat].some(user => user.id === id)
    ? conn.listAfk[m.chat]
    : [...conn.listAfk[m.chat], { username, id }]
  : [{ username, id }];

        const caption = `\n🚀 ${await conn.getName(m.sender)} @${m.sender.split("@")[0]} Sekarang lagi AFK\n➠ *Dengan Alasan:*\n${text ? '➠ ' + text : '➠ Tanpa alasan'}\n\n➠ *.listafk (melihat siapa saja yang afk)*`;

        await conn.reply(m.chat, caption, null, {
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "AFK Start",
                    thumbnail: await (await conn.getFile("https://telegra.ph/file/4751537e832c77df5fff9.jpg")).data
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
}

handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.group = true
handler.command = /^afk$/i

module.exports = handler
