const { SoundSearch } = require("../lib/scraper/SoundCloudSearch.js")

let handler = async (m, { conn, text }) => {
    if (!text) throw `Judulnya?`;
    let res = await SoundSearch(text);
    res = res.map((v) => `*Judul:* ${v.judul}\n*Link:* ${v.link}\n`).join`\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n`;
    m.reply(res);
};

handler.help = ['soundsearch'];
handler.tags = ['search'];
handler.command = /^(soundsearch)$/i;
handler.limit = true;

module.exports = handler;