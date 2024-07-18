/* let handler = async (m, { conn }) => {
    const messages = conn.chats[m.chat].messages;
    const participantCounts = {};
    Object.values(messages).forEach(({ key }) =>
        participantCounts[key.participant] = (participantCounts[key.participant] || 0) + 1
    );
    const sortedData = Object.entries(participantCounts).sort((a, b) => b[1] - a[1]);
    const totalM = sortedData.reduce((acc, [, total]) => acc + total, 0);
    const totalPeople = sortedData.length;
    const pesan = sortedData.map(([jid, total], index) => `*${index + 1}.* ${jid.replace(/(\d+)@.+/, '@$1')}: *${total}* pesan`).join('\n');
    await conn.reply(m.chat, `📊 *Total Pesan Terakhir*: *${totalM}* pesan dari *${totalPeople}* orang\n\n${pesan}`, m, { contextInfo: {
                mentionedJid: sortedData.map(([jid]) => jid)
            }
           }
           )
}
handler.help = ['totalpesan'];
handler.tags = ['group'];
handler.command = /^(totalpesan|totalchat|tc)$/i;
handler.group = handler.admin = true;

module.exports = handler; */

let handler = async (m, { conn }) => {
    let id = m.chat
    let mCount = {}
    let totalM = 0
    await conn.loadAllMessages(id, m => {
        let user = m.key.fromMe ? conn.user.jid : m.participant ? m.participant : id.includes('g.us') ? '' : id
        if (!user) return
        if (user in mCount) mCount[user]++
        else mCount[user] = 1
        totalM++
    }, 1000)
    let sorted = Object.entries(mCount).sort((a, b) => b[1] - a[1])
    let pesan = sorted.map(v => `${v[0].replace(/(\d+)@.+/, '@$1')}: ${v[1]} pesan`).join('\n')
    m.reply(`📊 *Total Pesan Terakhir*: *${totalM}* pesan\n\n${pesan}`, false, { contextInfo: { mentionedJid: sorted.map(v => v[0]) }})
}
handler.help = ['totalpesan']
handler.tags = ['group']
handler.command = /^totalpesan$/i
handler.group = handler.admin = true

module.exports = handler