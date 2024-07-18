const axios = require('axios')
const { toAudio } = require('../lib/converter.js');

const handler = async (m, { conn, args, command }) => {
if (command == 'coverai') {
	conn.videoVoice_ai = conn.videoVoice_ai ? conn.videoVoice_ai : {};
	if (m.sender in conn.videoVoice_ai) {
		return m.reply("You have undone job, please wait...");
	}
	const [voice_id, youtube_url] = args;
	if (!voice_id || !youtube_url) {
		return m.reply("Please input voice id and youtube url");
	}
	conn.videoVoice_ai[m.sender] = true;
	m.reply("Please wait a long time, maybe 1 minute");
	const { data } = await axios
		.request({
			baseURL: 'https://api.itsrose.life',
			url: "/sovits/inference_voice",
			method: "POST",
			headers: {
				Authorization: global.rose,
			},
			data: {
				voice_id,
				youtube_url,
				watermark: false,
			},
		})
		.catch((e) => e?.response);
	const { status, message, result } = data;
	if (!status) {
		delete conn.videoVoice_ai[m.sender];
		return m.reply(message);
	}
	const { video, metadata } = result;
	if (!video) {
		delete conn.videoVoice_ai[m.sender];
		return m.reply("Try again.");
	}
		conn.sendMessage(m.chat, {audio: {url: video},mimetype: "audio/mpeg"}, {quoted:m})
	delete conn.videoVoice_ai[m.sender];
} else if (command == 'voicemodel') {
try {
    const response = await axios.get('https://api.itsrose.life/sovits/get_voice_models', {
      headers: {
        'accept': 'application/json',
        'Authorization': global.rose
      }
    });
    
    const ppk = response.data.result.voice_ids;

    let resultnya = '*乂 Daftar voice models*\n\n';

    for (const x of ppk) {
      resultnya += `*-* ${x}\n`;
    }
    m.reply(resultnya);
  } catch (err) {
    console.error(err);
    m.reply(`Terjadi Kesalahan: ${err}`);
  }
}
};
handler.help = handler.command = ['coverai', 'voicemodel']
handler.tags = ['ai']
handler.premium = true

module.exports = handler