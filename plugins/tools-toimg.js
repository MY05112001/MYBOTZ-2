/*const uploadImage = require('../lib/uploadFile');

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `Balas stiker dengan caption *${usedPrefix + command}*`;
  let mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw `Mime *${mime}* tidak support`;
  m.react("🕒")
  
  let media = await m.quoted.download();
  let out = Buffer.alloc(0);
  if (/webp/.test(mime)) {
    out = await uploadImage(media);
  }
  await conn.sendMessage(m.chat, { image: { url: out }, caption: 'Done Desu' }, { quoted: m });
}

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = ['toimg'];

module.exports = handler;*/

const { webp2png } = require('../lib/webp2mp4.js');

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `Balas stiker dengan caption *${usedPrefix + command}*`;
  let mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw `Mime *${mime}* tidak support`;
  m.react("🕒")
  
    let media = await m.quoted.download();
    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);
    await conn.sendFile(m.chat, out, 'out.png', 'Done Desu', m);
}

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = ['toimg'];

module.exports = handler;