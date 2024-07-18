let handler = m => m;

handler.all = async function (m) {
  let setting = db.data.settings[this.user.jid];

  if (setting.autoBio) {
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);

    let emot = `${pickRandom(['⎔', '◈▻', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`;
    await this.setBio(`${emot} ${global.set.wm2} | Runtime: ${uptime} | Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Only Group' : 'Public'} | Version: ${require('../package.json').version} | Created By 6285757741408`).catch(_ => _);
  }
};

module.exports = handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}