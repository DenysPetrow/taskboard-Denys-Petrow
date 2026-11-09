const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Podłączenie nowego pliku routes/boards.js:
app.use('/api/boards', require('./routes/boards'));

app.listen(3000, () => console.log('Serwer: http://localhost:3000'));
