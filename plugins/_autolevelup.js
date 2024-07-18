const { color } = require('../lib/color')
const moment = require("moment-timezone")
const canvafy = require('canvafy')
let levelling = require('../lib/levelling')

module.exports = {
	before: async function(m) {
		let user = global.db.data.users[m.sender]
		if (!user.autolevelup) return !0
		let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)

		let before = user.level * 1
		while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
        
		if (before !== user.level) {
            let name = user.name
		    let ppUrl = "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/levelup.jpg"
            try {
                ppUrl = await this.profilePictureUrl(m.sender, 'image')
            } catch (error) {
                console.log(error)
            }
		
		    let chating = `Selamat!! ,Anda naik level!🎉🎉\n*[ ${before} ]* ➠ *[ ${user.level} ]*\nPangkat: *${user.role}*\n\n> ketik *.me* untuk mengecek profil`.trim()
		
		    try {
                const image = await new canvafy.LevelUp()
                    .setAvatar(ppUrl)
                    .setBackground("image", "https://telegra.ph/file/6894577305375f8139e3a.jpg")
                    .setUsername(user.name)
                    .setBorder("#000000")
                    .setAvatarBorder("#0066CC")
                    .setOverlayOpacity(0.7)
                    .setLevels(before, user.level)
                    .build();
            
                await this.sendMessage(m.chat, { image: image, caption: chating }, { quoted: m })
            } catch (error) {
			    await m.reply(chating)
			    console.log(color(chating, 'yellow'))
			    console.log(error)
		    }
	    }
    }
}