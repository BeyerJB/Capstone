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

app.listen(port, () => {
  console.log("It is running");
});

app.get("/", (req, res) => {
  res.send("SYSTEM ONLINE");
})

//THIS CALL GETS ALL TEAMS A USER IS PART OF VIA THEIR ID, RETURNS AN ARRAY OF OBJECTS WITH ALL RELEVANT FIELDS
app.post("/calendar_team/userid", (req, res) => {
  let userid = req.body.id;
  //console.log("ATTEMPTING WITH ID: ", userid);

  knex("calendar_users")
    .where({ user_id: userid })
    .select("team_id")
    .then((team_id) => {
      //console.log("LOOKUP GAVE TEAM ID: ", team_id[0].team_id);
      knex("calendar_teams")
        .where({ team_id: team_id[0].team_id })
        .select("*")
        .then((team_data) => res.status(200).json(team_data));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("TEAM LOOKUP FAILURE");
    });
});

//THIS CALL CREATES A CALENDAR EVENT, YOU MUST PASS IT A USERS ID IN ADDITION TO ALL RELEVANT EVENT FIELDS
app.post("/create_event", (req, res) => {
  let event_data = req.body;
  console.log("ATTEMPTING TO CREATE EVENT WITH: ", event_data.title);
  // //DIAGNOSTIC RETURN OF ALL EVENTS
  // knex("calendar_events")
  //   .select("*")
  //   .then((data) => res.status(200).json(data));

  knex("calendar_events")
    .insert({
      title: event_data.title,
      start_date: event_data.start_date,
      end_date: event_data.end_date,
      start_time: event_data.start_time,
      end_time: event_data.end_time,
      team_id: event_data.team_id,
      user_id: event_data.user_id,
      description: event_data.description,
      event_type: event_data.event_type,
      creator_id: event_data.creator_id
    })
    .then(res.status(201).json({ status: "INSERTED" }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "EVENT CREATION FAILED" });
    });
})

//THIS CALL RETURNS ALL EVENT TYPES AND THIER ASSOSIATED DATA
app.get("/event_type", (req, res) => {
  knex("event_type")
    .select("*")
    .then((data) => res.status(200).json(data));
})