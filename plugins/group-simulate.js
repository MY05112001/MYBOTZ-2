let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {
    const capti = `List Event: welcome, bye, promote, demote`
    if (!event) return await conn.reply(m.chat, capti, m)
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let part = who.length ? who : [m.sender]
    let act = false
    
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            act = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            act = 'remove'
            break
        case 'promote':
            act = 'promote'
            break
        case 'demote':
            act = 'demote'
            break
        default:
            throw m.reply(capti)
    }
    
    if (act) return conn.onParticipantsUpdate({
           id: m.chat,
        participants: part,
        action: act
    })
}

handler.help = ['simulate *<text>*']
handler.tags = ['owner']
handler.command = /^simulate$/i
handler.owner = true

module.exports = handler