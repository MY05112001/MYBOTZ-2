//By Arel
const axios = require("axios")
const cheerio = require("cheerio")

const handler = async (m, { conn, text, command, usedPrefix }) => {
    const ngen = await axios.get('https://otakudesu.cam');
    const $ = cheerio.load(ngen.data);
    let info = [];
    $('div.venz li').each(function (i) {
        const $this = $(this);
        let judul = $this.find('h2.jdlflm').text().trim();
        let episode = $this.find('div.epz').text().trim();
        let hari = $this.find("div.epztipe").text().trim();
        let tanggal = $this.find('div.newnime').text().trim();
        let link = $this.find('div.thumb a').attr('href');
        info.push({
            judul: judul,
            episode: episode,
            hari: hari,
            update: "Tanggal rilis: " + tanggal + "\nRating: tidak tersedia (situs ini tidak menyediakan info rating)\n" + "Link: " + link
        })
    });
    conn.reply(m.chat, info.map(v => 'Judul : ' + v.judul + '\nEpisode : ' + v.episode + '\nHari : ' + v.hari + '\n' + v.update).join('\n\n'), m);
};

handler.help = ['animelatest'];
handler.tags = ['anime'];
handler.command = /^(animelatest|animeterbaru|animeday)$/i;

module.exports = handler;
