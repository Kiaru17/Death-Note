let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `🚩 *EQUIPO DE AYUDANTES*
🍟 *Bot:* ${global.botname}
✨️ *Versión:* ${global.vs}

👑 *Propietario:*

• OfcDiego
🍟 *Rol:* Propietario
🚩 *Número:* ${creador}
✨️ *GitHub:* https://github.com/OfcDiego

🌸  *Colaboradores:*

• ArizzVal
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/5493625494354
✨️ *GitHub:* https://github.com/ArizzVal

• elrebelde21
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/5493625494354
✨️ *GitHub:* https://github.com/elrebelde21

• AzamiJs
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/5493625494354
✨️ *GitHub:* https://github.com/AzamiJs

• Eder
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/5493625494354
✨️ *GitHub:* https://github.com/WOTCHITO

• DarkesJs
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/5493625494354
✨️ *GitHub:* https://github.com/WOTCHITA`
await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🥷 Developers 👑`,
body: `🚩 Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: icono
}}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
