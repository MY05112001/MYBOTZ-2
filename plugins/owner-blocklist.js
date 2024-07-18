var fetch = require("node-fetch");

var handler = async (m, { conn }) => {
var block = await conn.fetchBlocklist()                    
conn.reply(m.chat, '*乂 Daftar List Yang Di Block*\n\n' + `Total: ${block == undefined ? '*0* Diblokir' : '*' + block.length + '* Diblokir'}\n` + block.map(v => '*-* @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: block })
};
handler.help = ['blocklist'];
handler.tags = ['info'];
handler.command = /^listbloc?k|bloc?klist|daftarbloc?k|blocks$/i
handler.rowner = true;

module.exports = handler;