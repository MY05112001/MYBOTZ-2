let handler = async (m, { conn }) => {
let inpo = `Kamu bisa membeli limit dengan menggunakan money contoh *.buy limit 1* nah gimana cara dapet balance kamu bisa tukarkan xp kamu dengan balance, gomana caranya bang??
Caranya *.jual xp 1* dan kamu akan mendapatkan balance, begitu juga sebaliknya, jika kamu kehabisan balance maka kamu harus jual limit kamu, Kamu bisa mendapatkan XP dengan cara bermain game, tenang aja owner akan berusaha mengembangkan game game yang seru dan menarik pastinya

Ya jadi seperti itu doang simple kan??, jadi ga usah tanya owner lagi gimana cara beli limit lah apa lah XD
Masih ga paham? gw gacorin pala lu`
conn.sendFooter(m.chat, `*Tutorial untuk membeli/menjual limit*`, inpo, m)
}
handler.help = handler.command = ['infoshop']
handler.tags = ['xp']

module.exports = handler