const os = require('os')
const fs = require("fs")
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys')
const vn = "./src/mp3/menunya.mp3";
  
const handler = async (m, { conn, usedPrefix: _p }) => { 
let tags = {} 
const defaultMenu = { 
  before: `
 
*Runtime :* %muptime
*Tanggal :* %date
*Database :* %totalreg user
%readmore`.trimStart(), 
  header: '┌─⊷ `%category`',
  body: '├❐ %cmd',
  footer: '└───────────\n',
  after: ``,
}

  try { 
     let name = m.pushName || conn.getName(m.sender) 
     let namebot = global.set.namebot

     
     let d = new Date(new Date + 3600000) 
     let locale = 'en' 
     // d.getTimeZoneOffset() 
     // Offset -420 is 18.00 
     // Offset    0 is  0.00 
     // Offset  420 is  7.00 
     let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }) 
     let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' }) 
     time = time.replace(/[.]/g, ':') 
     
     let _muptime 
     if (process.send) { 
       process.send('uptime') 
       _muptime = await new Promise(resolve => { 
         process.once('message', resolve) 
         setTimeout(resolve, 1000) 
       }) * 1000 
     } 
     
     let _uptime 
     if (process.send) { 
       process.send('uptime') 
       _uptime = await new Promise(resolve => { 
         process.once('message', resolve) 
         setTimeout(resolve, 1000) 
       }) * 1000 
     } 
     
     let totalreg = Object.keys(global.db.data.users).length
     let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
     let platform = os.platform() 
     let muptime = clockString(_muptime) 
     let uptime = clockString(_uptime)
     
     let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => { 
       return { 
         help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help], 
         tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags], 
         prefix: 'customPrefix' in plugin, 
         limit: plugin.limit, 
         premium: plugin.premium, 
         enabled: !plugin.disabled, 
       } 
     })
     for (let plugin of help) 
     if (plugin && 'tags' in plugin) 
     for (let tag of plugin.tags) 
     if (!(tag in tags) && tag) tags[tag] = tag 
     conn.menu = conn.menu ? conn.menu : {} 
     
     let before = conn.menu.before || defaultMenu.before 
     let header = conn.menu.header || defaultMenu.header 
     let body = conn.menu.body || defaultMenu.body 
     let footer = conn.menu.footer || defaultMenu.footer 
     let after = conn.menu.after || defaultMenu.after 
     let _text = [ 
       before, 
       ...Object.keys(tags).map(tag => { 
         return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [ 
           ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => { 
             return menu.help.map(help => { 
               return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help) 
                 .replace(/%islimit/g, menu.limit ? '(Limit)' : '') 
                 .replace(/%isPremium/g, menu.premium ? '(Premium)' : '') 
                 .trim() 
             }).join('\n') 
           }), 
           footer 
         ].join('\n') 
       }), 
       after 
     ].join('\n') 
     let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : '' 
     let replace = { '%': '%', p: _p, uptime, muptime, me: conn.getName(conn.user.jid), name, date, time, platform, _p, totalreg, rtotalreg, namebot, readmore: readMore } 
     text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name]) 

     const ftrol = {
     key : {
     remoteJid: 'status@broadcast',
     participant : '0@s.whatsapp.net'
     },
     message: {
     orderMessage: {
     itemCount : 2022,
     status: 1,
     surface : 1,
     message: `Hai Kak ${m.name}!`, 
     orderTitle: `▮Menu ▸`,
     thumbnail: (await conn.getFile(await conn.profilePictureUrl(m.sender).catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg'))).data,
     sellerJid: '0@s.whatsapp.net' 
     }
     }
     }
     await m.reply('Loading.. Please wait')

    await conn.sendFooterWithMedia(m.chat, `👋 Halo kak ${m.name} ${ucapan()}`, text.trim(), global.thumb, m)
    //  await conn.sendMessageModify(m.chat, text.trim(), m, { largeThumb: true, thumbnail: global.thumb, title: null, body: null, url: global.db.data.settings[conn.user.jid].link })
     
  } catch (e) {
    conn.reply(m.chat, 'Sorry the menu is in error', m)
    throw e
  }
} 
handler.help = ['menu']
handler.command = /^(menu|allmenu)$/i
handler.register = false
handler.exp = 3

module.exports = handler
  
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  let time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat dinihari"
  if (time >= 4) res = "Selamat pagi"
  if (time > 10) res = "Selamat siang"
  if (time >= 15) res = "Selamat sore"
  if (time >= 18) res = "Selamat malam"
  return res
}