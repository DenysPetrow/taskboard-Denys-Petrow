const message = document.getElementById('message');

function showError(text) {
  const alert = el('div', 'alert alert-danger alert-dismissible', text);
  alert.setAttribute('role', 'alert');
  const close = el('button', 'btn-close');
  close.type = 'button';
  close.setAttribute('data-bs-dismiss', 'alert');
  close.setAttribute('aria-label', 'Zamknij');
  alert.appendChild(close);
  message.replaceChildren(alert);
}

// Czerwone pole + komunikat; zwraca true, gdy pole jest poprawne
function check(id, ok, msg) {
  const input = document.getElementById(id);
  input.classList.toggle('is-invalid', !ok);
  if (!ok) input.parentElement.querySelector('.invalid-feedback').textContent = msg;
  return ok;
}

async function send(path, body) {
  try {
    const res = await fetch('/api/auth/' + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) return showError(data.error);
    window.location.href = 'boards.html';
  } catch (err) {
    showError('Brak połączenia z serwerem');
  }
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value;
  const ok = [check('login', login !== '', 'Podaj login'), check('password', password !== '', 'Podaj hasło')];
  if (ok.every(Boolean)) send('login', { login, password });
});

document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const v = (id) => document.getElementById(id).value;
  const login = v('regLogin').trim();
  const firstName = v('regFirst').trim();
  const lastName = v('regLast').trim();
  const password = v('regPassword');
  const ok = [
    check('regLogin', /^[A-Za-z0-9._-]{3,30}$/.test(login), 'Login: 3–30 znaków, litery, cyfry, kropka, myślnik lub podkreślnik'),
    check('regFirst', firstName !== '', 'Podaj imię'),
    check('regLast', lastName !== '', 'Podaj nazwisko'),
    check('regPassword', password.length >= 8, 'Hasło musi mieć co najmniej 8 znaków'),
    check('regPassword2', v('regPassword2') === password, 'Hasła muszą być takie same')
  ];
  if (ok.every(Boolean)) send('register', { login, firstName, lastName, password });
});
