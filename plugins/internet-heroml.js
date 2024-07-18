const { HeroML } = require("../lib/scraper/heroml.js")

let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(Func.example(usedPrefix, command, 'Nana'))
let res = await HeroML(text)
let hero = res
let ini = res.gameplay_info
let story = res.story_info_list
let teks = `*Name:* ${text}\n*Alias:* ${story.Alias}\n*Origin:* ${story.Origin}\n*Species:* ${story.Species}\n*Gender:* ${story.Gender}\n*Affiliation:* ${story.Affiliation}\n*Weapon:* ${story.Weapons}\n*Abilities:* ${story.Abilities}\n*Height:* ${story.Height}\n`
let kntl = `\n*Realese:* ${hero.release}\n*Role:* ${hero.role}\n*Specialty:* ${hero.specialty}\n*Lane:* ${hero.lane}\n*Price:* ${hero.price}\n\n*Durability:* ${ini.durability}\n*Offense:* ${ini.offense}\n*Control:* ${ini.control_effect}\n*Difficulty:* ${ini.difficulty}\n\n`
res = res.attributes.map((v) => `*Attributes:* ${v.attribute}\n*Level:* ${v.level_1}\n*Growth:* ${v.growth}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`

conn.sendFile(m.chat, hero.hero_img, '', teks + kntl + res, m)
} 
handler.help = ['heroml']
handler.tags = ['internet']
handler.command = /^(heroml)$/i
handler.limit = true

module.exports = handler