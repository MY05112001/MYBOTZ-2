let handler = (m) => m

handler.before = async (m, { conn, isPrems, owner }) => {
  let user = db.data.users[m.sender]
  if (m.chat.endsWith("broadcast")) return
  if (user.premiumTime != 0 && user.premium) {
    if (new Date() * 1 >= global.db.data.users[m.sender].premiumTime) {
      conn.reply(m.chat, 'Your premium has expired, if you are interested in upgrading your premium again, please contact the owner.', m).then(() => {
        db.data.users[m.sender].premium = false
        db.data.users[m.sender].premiumTime = 0
        this.sendContact(m.chat, [{ name: `${global.set.nameown}`, number: global.owner, about: 'Hanya seorang pemula yang baru belajar bot:)' }], m, { org: 'Developer', website: 'https://github.com/Im-Dims', email: 'ucupnetwork@gmail.com', location: 'Jepang' })
      })
    }
  }
}

module.exports = handler