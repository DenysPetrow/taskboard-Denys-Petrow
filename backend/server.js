const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const session = require('express-session');
const { requireAuth } = require('./middleware/auth');

// Upewnij się, że masz zaimportowane middleware requireAuth (np. z folderu middleware):
// const requireAuth = require('./middleware/requireAuth');

const app = express();
app.use(express.json());

// Konfiguracja sesji (musi być przed podpięciem tras)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Podłączenie plików z routes/:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', requireAuth, require('./routes/users'));
app.use('/api/boards', requireAuth, require('./routes/boards'));
app.use('/api/tasks', requireAuth, require('./routes/tasks'));

// Serwowanie plików statycznych frontendu
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(3000, () => console.log('Serwer: http://localhost:3000'));

