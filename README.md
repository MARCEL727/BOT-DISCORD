# DesignerBot Web + Bot (Template)

Langkah cepat:
1. Salin file-file ke folder project.
2. Jalankan `cp .env.example .env` lalu isi `.env` dengan DISCORD_TOKEN, BOT_NAME, dan ADMIN_KEY.
3. Install dependency: `npm install`
4. Jalankan: `npm start`
5. Buka http://localhost:3000 untuk melihat dashboard dan status bot.

Keamanan:
- Jangan commit `.env` ke repo publik.
- Simpan DISCORD_TOKEN dan ADMIN_KEY di secret manager host saat deploy (Railway, Render, Heroku, dsb).
- Batasi akses admin ke endpoint start/stop dengan ADMIN_KEY.

Deployment singkat:
- Railway / Render / Heroku: set environment variables sesuai `.env` dan jalankan `npm start`.
- Pastikan port disesuaikan (`process.env.PORT`).

Catatan:
- Bot ini menggunakan discord.js dan memerlukan intent MessageContent agar dapat membaca pesan text biasa. Pastikan intent di developer portal Discord diaktifkan bila bot perlu membaca pesan.
- Jika ingin fitur lanjutan (persistence, database, web auth untuk admin), beri tahu saya dan saya bantu menambahkan.