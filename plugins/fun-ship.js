const canvafy = require('canvafy');

let handler = async (m) => {
    let who = m.mentionedJid[0];

    if (!who) throw `Tag seseorang!`;

    let korban = await conn.profilePictureUrl(who, 'image').catch(_ => './src/pp.png');
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/pp.png');

    let capt = `Ini Adalah Hasil Ship Antara @${m.sender.split("@")[0]} dengan @${who.split("@")[0]}`;

    let ship = await new canvafy.Ship()
        .setAvatars(pp, korban)
        .setBackground("image", "https://telegra.ph/file/8f636a846fccb1ae246c5.jpg")
        .setBorder("#f0f0f0")
        .setOverlayOpacity(0.5)
        .build();

    let yy = await conn.sendMessage(
        m.chat,
        { image: ship, caption: capt, mentions: [m.sender, who] },
        { quoted: m }
    );

    /* setTimeout(() => {
        conn.sendMessage(m.chat, { delete: yy.key });
    }, 30000);
    } */
};

handler.help = ['ship'];
handler.tags = ['fun'];
handler.command = /^ship$/i;
handler.group = true

module.exports = handler;