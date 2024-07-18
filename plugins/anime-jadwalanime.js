const fetch = require('node-fetch');

// Fungsi untuk menerjemahkan teks menggunakan Google Translate API
const translateText = async (text, targetLanguage) => {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(text)}`);
    const json = await res.json();
    return json[0][0][0]; // Ambil hasil terjemahan dari respons JSON
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Kembalikan teks asli jika terjadi kesalahan
  }
};

let handler = async(m, { conn, text }) => {
  try {
    let day = text.trim().toLowerCase()
    let dayEnglish = ''
    switch(day) {
      case 'senin':
        dayEnglish = 'monday'
        break
      case 'selasa':
        dayEnglish = 'tuesday'
        break
      case 'rabu':
        dayEnglish = 'wednesday'
        break
      case 'kamis':
        dayEnglish = 'thursday'
        break
      case 'jumat':
        dayEnglish = 'friday'
        break
      case 'sabtu':
        dayEnglish = 'saturday'
        break
      case 'minggu':
        dayEnglish = 'sunday'
        break
      default:
        return m.reply('Masukkan nama hari yang valid dalam bahasa Indonesia!')
    }

    let res = await fetch(`https://api.jikan.moe/v4/schedules?filter=${dayEnglish}`)
    if (!res.ok) throw new Error(`Gagal mengambil jadwal: ${res.statusText}`)
    let json = await res.json()
    
    let jadwal = `*乂 Jadwal Anime*\n\n*Hari:* ${day.toUpperCase()}`
    let lastSynopsis = null;

    // Mendapatkan dan menambahkan informasi untuk setiap anime dalam jadwal
    for (let anime of json.data) {
      jadwal += `\n∘ *Judul* : ${anime.title}`
      jadwal += `\n∘ *Rating* : ${anime.rating}`
      jadwal += `\n∘ *Type* : ${anime.type}`
      jadwal += `\n∘ *Status* : ${anime.status}`
      jadwal += `\n∘ *Judul Jepang* : ${anime.title_japanese}`
      jadwal += `\n∘ *Sedang tayang* : ${anime.airing ? 'Ya' : 'Tidak'}`
      jadwal += `\n∘ *Rank* : ${anime.rank}`
      jadwal += `\n∘ *Jumlah anggota* : ${anime.members}`
      jadwal += `\n∘ *Polaritas* : ${anime.popularity}`
      jadwal += `\n∘ *Favorit* : ${anime.favorites}`
      // Terjemahkan sinopsis
      const translatedSynopsis = await translateText(anime.synopsis, 'id');
      // Cek apakah ada sinopsis dan apakah harus menambahkan spasi tambahan
      if (anime.synopsis && lastSynopsis !== anime.synopsis) {
        jadwal += `\n∘ *Sinopis* : ${translatedSynopsis}`
        lastSynopsis = anime.synopsis;
      }
      jadwal += `\n∘ *Tahun* : ${anime.year}`
      jadwal += `\n∘ *Musim* : ${anime.season}`; // Tidak ada spasi tambahan setelah tahun
      // Jika judul baru dimulai, tambahkan spasi tambahan
      if (json.data.indexOf(anime) < json.data.length - 1 && anime.title !== json.data[json.data.indexOf(anime) + 1].title) {
        jadwal += '\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°';
      }
    }

    conn.reply(m.chat, jadwal, m)
  } catch (error) {
    console.error(error)
    m.reply('Terjadi kesalahan saat mengambil jadwal anime...')
  }
}

handler.help = ['jadwalanime <hari>']
handler.tags = ['anime']
handler.command = /^(jadwalanime)$/i
handler.limit = 3

module.exports = handler