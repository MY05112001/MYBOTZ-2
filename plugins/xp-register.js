const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { text, usedPrefix, command }) {
let user = db.data.users[m.sender]
if (user.registered === true) return m.reply(`Your number has been registered, if you want to re-register, send it ${usedPrefix + command} sn`)
if (!Reg.test(text)) return m.reply(Func.example(usedPrefix, command, 'mari.15'))
let [_, name, splitter, age] = text.match(Reg)
if (!name) return m.reply('Enter your name')
if (!age) return m.reply('Enter your age')
age = parseInt(age)

if (name.length > 20) return m.reply('Name is too long')
if (age > 80) return m.reply('Too old')
if (age < 5) return m.reply('Too young, can babies type?')
user.name = name.trim()
user.age = age
user.regTime = +new Date()
user.registered = true

let sn = createHash('md5').update(m.sender).digest('hex')
let teks = `*Registered successfully*

╭─「 *Account Info* 」
│❐ *Name:* ${name}
│❐ *Age:* ${age} years
│❐ *Sn:* ${sn}
╰────────────┈ ⳹`
conn.sendFooter(m.chat, teks, `${global.set.wm3}`, m)
}
handler.help = ['register'].map((v) => v + '')
handler.tags = ['xp']
handler.command = ['reg', 'register', 'daftar']

module.exports = handler