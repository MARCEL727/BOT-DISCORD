async function fetchStatus() {
  const res = await fetch('/status');
  if (!res.ok) { document.getElementById('status').textContent = 'error'; return; }
  const json = await res.json();
  document.getElementById('bot-name').textContent = json.name || '-';
  document.getElementById('status').textContent = json.status || 'unknown';
}

document.getElementById('refresh').addEventListener('click', fetchStatus);
document.getElementById('start').addEventListener('click', async () => {
  const key = prompt('Masukkan ADMIN_KEY (x-admin-key):');
  if (!key) return;
  const res = await fetch('/start', { method: 'POST', headers: { 'x-admin-key': key }});
  alert(await res.text());
  fetchStatus();
});
document.getElementById('stop').addEventListener('click', async () => {
  const key = prompt('Masukkan ADMIN_KEY (x-admin-key):');
  if (!key) return;
  const res = await fetch('/stop', { method: 'POST', headers: { 'x-admin-key': key }});
  alert(await res.text());
  fetchStatus();
});

fetchStatus();
setInterval(fetchStatus, 5000);