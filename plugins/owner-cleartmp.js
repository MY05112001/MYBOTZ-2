const cp = require('child_process');
const { promisify } = require('util');
const exec = promisify(cp.exec).bind(cp);

const handler = async (m) => {
	await conn.reply(m.chat, "Done", m);
    let o;
    try {
        o = await exec('rm -rf tmp && mkdir tmp');
    } catch (e) {
        o = e;
    }
};

handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(cleartmp)$/i;
handler.rowner = true;

module.exports = handler;