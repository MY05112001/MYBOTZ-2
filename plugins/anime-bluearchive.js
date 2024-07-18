const gis = require('g-i-s')

let handler = async(m, { conn, text, usedPrefix, command }) => {
try {
m.react("🕒")

if (command == 'hina') {
var opts = {
  searchTerm: `zerochan.net Sorasaki hina blue archive`,
};

function logResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    let img = results
    let res = img[Math.floor(Math.random() * img.length)];
    return conn.sendFile(m.chat, res.url, 'hina.jpg', `Sukses`, m)
  }
}

gis(opts, logResults);
 
} else if (command == 'arisu') {
var opts = {
  searchTerm: `zerochan.net Arisu blue archive`,
};

function logResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    let img = results
    let res = img[Math.floor(Math.random() * img.length)];
    return conn.sendFile(m.chat, res.url, 'arisu.jpg', `Sukses`, m)
  }
}

gis(opts, logResults);

} else if (command == 'azusa') {
var opts = {
  searchTerm: `zerochan.net Shirasu azusa blue archive`,
};

function logResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    let img = results
    let res = img[Math.floor(Math.random() * img.length)];
    return conn.sendFile(m.chat, res.url, 'azusa.jpg', `Sukses`, m)
  }
}

gis(opts, logResults);

} else if (command == 'mika') {
var opts = {
  searchTerm: `zerochan.net Misono mika blue archive`,
};

function logResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    let img = results
    let res = img[Math.floor(Math.random() * img.length)];
    return conn.sendFile(m.chat, res.url, 'mika.jpg', `Sukses`, m)
  }
}

gis(opts, logResults);
}

} catch (e) {
console.log(e)
m.reply(Func.jsonFormat(e))
}
}
handler.help = handler.command = ['hina', 'arisu', 'azusa', 'mika']
handler.tags = ['anime']
handler.limit = true

module.exports = handler