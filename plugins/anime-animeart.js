const handler = async (m, { conn, text, usedPrefix, command }) => {
let fuck = text.replace(/ /g, "_");
  if (!fuck) {
    conn.reply(m.chat, Func.example(usedPrefix, command, `blue archive`), m);
    return;
  }
  m.reply(status.wait)
  try {
    const data = await Func.fetchJson('https://danbooru.donmai.us/posts.json?tags=' + encodeURIComponent(fuck) + '&limit=10');
      if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const post = data[randomIndex];
      const { file_url, source, tag_string_general, tag_string_character, tag_string_copyright, tag_string_artist, rating, file_ext } = post;
      conn.sendFile(m.chat, file_url, 'anime.jpg', `*Tags Copyright :* ${tag_string_copyright}\n*Tags Character :* ${tag_string_character}\n*Tags Artist :* ${tag_string_artist}\n*Tags General :* ${tag_string_general}\n*Source :* ${source}\n*Rating :* ${rating}\n*Format :* ${file_ext}`, m);
    } else {
      conn.reply(m.chat, 'Art tidak ditemukan', m);
    }
  } catch (e) {
    console.log(e);
    return m.reply(Func.jsonFormat(e));
  }
};

handler.help = ['animeart'];
handler.tags = ['anime'];
handler.command = /^(animeart|artanime)$/i;
handler.register = handler.premium = true

module.exports = handler;