import fetch from 'node-fetch';
const handler = async (m, { conn, args, usedPrefix }) => {
if (!args[0]) {
if (!db.data.chats[m.chat].modohorny && m.isGroup) return conn.reply(m.chat, `🚩 *¡Este comando está deshabilitado en este grupo!*`, m, rcanal)
await conn.reply(m.chat, '🚩 Ingresa el nombre de la imágen que estas buscando', m, rcanal);
return;
}
const use = args[0];
const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${use}`;
try {
await m.react(rwait);
conn.reply(m.chat, wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const response = await fetch(url);
const data = await response.json();
if (!data || data.length === 0) {
await conn.reply(m.chat, `🚩 No hubo resultados para *${use}*`, m, rcanal);
return;
}
const randomIndex = Math.floor(Math.random() * data.length);
const randomImage = data[randomIndex];
const urlimg = randomImage.file_url;
await conn.sendFile(m.chat, urlimg, 'thumbnail.jpg', `*Resultados De:* ${use}`, m, null, rcanal);
await m.react(done);
} catch {
await m.react(error);
await m.reply('🚩 Ocurrió un error.');
}};
handler.help = ['r34 <texto>'];
handler.command = ['r34', 'rule34'];
handler.tags = ['nsfw'];
handler.register = true;
// handler.estrellas = 2;
export default handler;

/*import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

const dbFilePath = path.resolve('./sentUrls.json');

const readDb = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {};
    }
    throw err;
  }
};

const writeDb = async (data) => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    throw err;
  }
};

const cleanDb = async () => {
  const db = await readDb();
  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  
  for (const [url, timestamp] of Object.entries(db)) {
    if (now - timestamp > THIRTY_DAYS) {
      delete db[url];
    }
  }

  await writeDb(db);
};

const handler = async (m, { conn, usedPrefix, command, text }) => {
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '🚩 *¡Estos comandos están desactivados!*';
  if (!text) {
    throw `🚩 *Por favor, proporciona un texto*\n🍟 *Ejemplo:* ${usedPrefix + command} Alya`;
  }
  
  try {
  conn.reply(m.chat, '🍟  *Enviando Los Resultados...*', m, {
      contextInfo: { 
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          showAdAttribution: true,
          title: packname,
          body: '🌟 Ai Yaemori - MD',
          previewType: 0, 
          thumbnail: icons,
          sourceUrl: redes 
        }
      }
    });

    await cleanDb();
    conn.sendPresenceUpdate('composing', m.chat);
    const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(text)}&json=1`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('🚩 Error en la solicitud a la API');
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('🚩 No se encontraron imágenes');
    }

    const db = await readDb();
    const newImages = data.filter(post => !db[post.file_url]);

    if (newImages.length === 0) {
      throw new Error('🚩 No se encontraron nuevas imágenes para mostrar');
    }

    const imagesToDownload = newImages.sort(() => 0.5 - Math.random()).slice(0, 6);
    const results = await Promise.all(imagesToDownload.map(async (post, index) => {
      const imageResponse = await fetch(post.file_url);
      if (!imageResponse.ok) {
        throw new Error('🚩 Error al descargar la imagen');
      }
      const imageBuffer = await imageResponse.buffer();
      db[post.file_url] = Date.now();

      const mediaMessage = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: 'Desliza para ver más' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `Hentai ${index + 1}`,
          hasMediaAttachment: true,
          imageMessage: mediaMessage.imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      };
    }));

    await writeDb(db);

    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🚩 Resultados de: ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: 'R U L E 3 4 - N S F W 🔍'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: results
            })
          })
        }
      }
    }, {
      quoted: m
    });

    await conn.relayMessage(m.chat, messageContent.message, {
      messageId: messageContent.key.id
    });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌️ *Ocurrió un error:* ${error.message}`, m, fake);
  }
};

handler.help = ['rule34'];
handler.tags = ['nsfw'];
handler.command = /^rule34|rule$/i;

export default handler;*/
