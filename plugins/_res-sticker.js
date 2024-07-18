const { sticker } = require('../lib/sticker.js');

module.exports.before = async function(m, { conn, participants }) {
    conn.dims_join = conn.dims_join ? conn.dims_join: {
            join: false,
            time: 0,
        };
    const currentTime = Math.floor(Date.now() / 1000);
    if (!m.isGroup || conn.dims_join["time"] > currentTime) {
        return;
    }
    if (m.sender === "6285757741408@s.whatsapp.net") {
        let stiker = await sticker(null, `https://pomf2.lain.la/f/68a85qkj.jpg`, global.packname, global.author);
        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        }
        conn.dims_join = {
            join: true,
            time: Math.floor(Date.now() / 1000) + 2 * 1000,
        };
    }
};