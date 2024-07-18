const axios = require('axios')
const translate = require('@vitalets/google-translate-api');
const confirmation = {};

const handler = async (m, { conn, args, usedPrefix, command, text }) => {
  if (confirmation[m.sender]) return m.reply('Kamu Sedang Memilih Item!');
  if (!text) return m.reply(Func.example(usedPrefix, command, `takanashi hoshino`));
  try {
    m.reply(status.wait);
    const { data } = await axios.get(API('arif', '/ai/cai/search', { query: text }, 'apikey'));
    const { result } = data;
    let capt = `*乂 Character Ai*\n*Note:* Silakan pilih nomor untuk set chara ke databasemu:\n\n`;
    result.forEach((res, index) => {
      capt += `*${index + 1}.* *Nama:* ${res.name}\n*Greeting:* ${res.greeting}\n*Score:* ${res.score}\n\n`;
    });
    capt += `\nKetik nomor dari caption list di atas!`;
    capt += `\nWaktu memilih habis dalam _60 detik_`;
     conn.reply(m.chat, capt, m);
    confirmation[m.sender] = {
      sender: m.sender,
      to: m.sender,
      message: m,
      result,
      timeout: setTimeout(() => (m.reply('Waktu memilih telah habis'), delete confirmation[m.sender]), 60 * 1000)
    };
  } catch (e) {
    console.log(e)
    return m.reply(Func.jsonFormat(e));
  }
};

handler.before = async (m, { conn }) => {
  if (m.isBaileys) return;
  if (!(m.sender in confirmation)) return;
  if (!m.text) return;
    const { timeout, sender, message, to, result } = confirmation[m.sender];
  if (m.id === message?.id) return;
  const choice = parseInt(m.text);
  if (choice > 0 && choice <= result.length) {
    const rescai = result[choice - 1];
    const charaid = rescai.id;
    m.reply(global.status.wait);
    const { data } = await axios.get(API('arif', '/ai/cai/createChat', { character_id: charaid }, 'apikey'));          
    const chatid = data.result.chatId;
    const cname = rescai.name;
    const user = global.db.data.users[m.sender] || {};
    user.cai = {
      charaId: charaid,
      chatId: chatid,
      charaName: cname
    };
    m.reply(`Character *${rescai.name}* berhasil ditambah didatabasemu`);
  }
  clearTimeout(timeout);
  delete confirmation[sender];
};
handler.help = ['caisearch'];
handler.tags = ['ai'];
handler.command = /^(caisearch)$/i;
handler.register = true;
handler.premium = true;

module.exports = handler;