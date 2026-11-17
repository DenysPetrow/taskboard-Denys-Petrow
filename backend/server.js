const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const session = require('express-session');
const { requireAuth } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', requireAuth, require('./routes/users'));
app.use('/api/boards', requireAuth, require('./routes/boards'));
app.use('/api/tasks', requireAuth, require('./routes/tasks'));

app.get('/', (req, res) => res.redirect('/login.html'));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Błędy serwera jako JSON (frontend zawsze dostaje pole error)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Błąd serwera' });
});

app.listen(3000, () => console.log('Serwer: http://localhost:3000'));
