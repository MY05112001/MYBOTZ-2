const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

let handler = async (m, { conn, command, text, usedPrefix, args }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'https://github.com/Im-Dims/main-euphyllia-md'));
  if (!regex.test(args[0])) throw 'Invalid repositories!';

  try {
    let [_, user, repo] = (args[0] || '').match(regex) || [];
    repo = repo.replace(/.git$/, '');
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    let filename = (await Funct.fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
    m.reply(`*_sending file, don't spam . . ._*`);
    let name = filename.replace('.zip.zip', '.zip');
    conn.sendMedia(m.chat, url, m, { fileName: name, mimetype: '.zip', mentions: [m.sender] });
  } catch (e) {
    console.log(e);
    m.reply(`Terjadi Kesalahan, Tidak Dapat Menemukan Nickname/Repostory Yang Kamu Masukan`);
  }
};

handler.help = ['gitclone'];
handler.tags = ['downloader'];
handler.command = /gitclone/i;
handler.limit = true;

module.exports = handler;