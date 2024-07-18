const fetch = require("node-fetch")

let handler = async (m, { conn, args, usedPrefix, command }) => {
await m.react("🕒")

let type = (command).toLowerCase()
switch (type) {
case 'waifu':
let _waifu = await fetch('https://api.waifu.pics/sfw/waifu')
if (!_waifu.ok) throw await _waifu.text()
let waifu = await _waifu.json()
if (!waifu.url) throw global.status.error
conn.sendFile(m.chat, waifu.url, 'waifu.jpg', 'Wangy Wangy >,<', m)
break

case 'neko':
let _neko = await fetch('https://api.waifu.pics/sfw/neko')
if (!_neko.ok) throw await _neko.text()
let neko = await _neko.json()
if (!neko.url) throw global.status.error
conn.sendFile(m.chat, neko.url, 'neko.jpg', 'Wangy Wangy >,<', m)
break 

case 'megumin':
let _megumin = await fetch('https://api.waifu.pics/sfw/megumin')
if (!_megumin.ok) throw await _megumin.text()
let megumin = await _megumin.json()
if (!megumin.url) throw global.status.error
conn.sendFile(m.chat, megumin.url, 'megumin.jpg', 'Wangy Wangy >,<', m)
break

case 'loli':
let res = await fetch('https://raw.githubusercontent.com/Im-Dims/Database-doang-sih/main/loli.json')
if (!res.ok) throw await `${res.status} ${res.statusText}`;
let json = await res.json();
let url = json[Math.floor(Math.random() * json.length)]
conn.sendFile(m.chat, url, 'loli.jpg', 'Tch Dasar Pedo', m)
break

default:
}
}
handler.help = handler.command = ['waifu', 'neko', 'megumin', 'loli']
handler.tags = ['anime']
handler.limit = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
