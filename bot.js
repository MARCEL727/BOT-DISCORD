const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');

let client = null;

async function startBot() {
  if (client && client.isReady()) return client;
  const token = process.env.DISCORD_TOKEN;
  if (!token) throw new Error('DISCORD_TOKEN not set in environment');

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
  });

  client.once('ready', () => {
    console.log(`${process.env.BOT_NAME || 'Bot'} ready as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: 'Designing Discord servers', type: ActivityType.Playing }],
      status: 'online'
    });
  });

  client.on('messageCreate', async (message) => {
    try {
      if (message.author.bot) return;
      const raw = message.content.toLowerCase();

      // Respons sederhana: bila pesan mengandung kata kunci atau memanggil bot
      if (raw.startsWith('!designer') || raw.includes('design') || message.mentions.has(client.user)) {
        await message.reply(generateDesignReply(raw));
      }
    } catch (err) {
      console.error('message handler error:', err);
    }
  });

  await client.login(token);
  return client;
}

function getStatus() {
  return client && client.isReady() ? 'online' : 'offline';
}

async function stopBot() {
  if (client) {
    await client.destroy();
    client = null;
  }
}

function generateDesignReply(content) {
  if (content.includes('role')) {
    return 'Saran: Gunakan role terstruktur (Admin, Moderator, Designer, Member). Beri warna & permission terpisah untuk menghindari kebocoran permission.';
  }
  if (content.includes('channel')) {
    return 'Saran channel: buat kategori & channel: #welcome, #rules, #announcements, #general, #design-requests, #voice. Gunakan channel private untuk tim.';
  }
  if (content.includes('welcome')) {
    return 'Tambahkan message welcome + auto-role via bot automasi (mis. YAGPDB, MEE6) dan guidelines singkat pada pin message.';
  }
  if (content.includes('rules')) {
    return 'Buat #rules singkat & jelas. Beri reaction ✅ untuk konfirmasi bahwa user sudah membaca. Gunakan role gating bila perlu.';
  }
  // default prompt
  return 'Hai! Aku DesignerBot — aku bisa bantu saran struktur server, role, dan channel. Coba tanya "roles", "channels", atau "welcome".';
}

module.exports = { startBot, getStatus, stopBot };