const express = require("express");
const app = express();
const port = process.env.port || 8080;
const cors = require("cors");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Create notice
app.post('/api/notices', async (req, res) => {
  const { submitter_id, supervisor_id, body, notice_type } = req.body;
  try {
    await knex('user_notice').insert({ submitter_id, supervisor_id, body, notice_type });
    res.status(201).json({ message: 'Notice created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update notice status
app.put('/api/notices', async (req, res) => {
  const { request_id, choice } = req.body;
  try {
    await knex('user_notice').where({ user_notice_id: request_id }).update({ notice_status: choice });
    res.status(200).json({ message: 'User notice updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get notices submitted to user
app.get('/api/notices/supervisor/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const notices = await knex('user_notice').select('*').where({ recipient_id: userId, notice_status: 1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get notices submitted by user
app.get('/api/notices/submitter/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const notices = await knex('user_notice').select('*').where({ submitter_id: userId});
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log("It is running");
});