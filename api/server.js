const express = require("express");
const app = express();
const port = process.env.port || 8080;
const cors = require("cors");
const morgan = require('morgan')
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const bcrypt = require("bcrypt");
app.use(morgan(':method :url status::status :response-time ms'))
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


// app.get('/', req, res) {
//   res.status(200).send({message: 'server is running'})
// }

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await knex('calendar_users').where({ username }).first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({
      userID: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      rank: user.rank
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log("It is running");
});

