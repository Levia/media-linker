require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', status: 'server is running' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));