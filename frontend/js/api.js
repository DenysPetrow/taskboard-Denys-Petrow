// Wspólna funkcja do zapytań API; przy 401 przenosi na logowanie
async function api(path, method = 'GET', body) {
  const res = await fetch('/api' + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    window.location.href = 'login.html';
    return new Promise(() => {}); // zatrzymuje dalszy kod
  }
  const data = res.status === 204 ? null : await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
}

// Nagłówek: imię zalogowanej osoby i przycisk "Wyloguj"
async function initHeader() {
  const me = await api('/auth/me');
  document.getElementById('userName').textContent = me.firstName + ' ' + me.lastName;
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await api('/auth/logout', 'POST');
    window.location.href = 'login.html';
  });
  return me;
}

// Pomocnik: element z klasą i tekstem (textContent, bez wstrzykiwania HTML)
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
