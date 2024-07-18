let handler = async (m, {
  conn
}) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await conn.sendFooter(m.chat, 'Merestart...', 'Silakan tunggu selama 1 menit', m)
    await global.db.write()
    process.send('reset')
  } else throw '_eeeeeiiittsssss..._'
}
handler.help = ['debounce' + (process.send ? '' : ' (Not working)')]
handler.tags = ['owner']
handler.command = ['restart', 'debounce']
handler.owner = true

module.exports = handler