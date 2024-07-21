const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.post('/messages', async (req, res) => {
  const { user_id, message } = req.body;

  try {
    const newMessage = await pool.query(
      'INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING *',
      [user_id, message]
    );
    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error('Error inserting message:', err.stack);
    res.status(500).send('Server Error');
  }
});

router.get('/messages', async (req, res) => {
  try {
    const allMessages = await pool.query('SELECT * FROM messages ORDER BY timestamp ASC');
    res.json(allMessages.rows);
  } catch (err) {
    console.error('Error fetching messages:', err.stack);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
