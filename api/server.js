const express = require("express");
const app = express();
const port = process.env.port || 8080;
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const bcrypt = require("bcrypt");
app.use(morgan(":method :url status::status :response-time ms"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// // All Calendar data
app.get(`/mycalendar`, function (req, res) {
  var userId = req.query.userId;
  console.log(req, res);
  knex("calendar_events")
    .join('event_type', 'calendar_events.event_type', 'event_type.event_id')
    .where("user_id", userId)
    .select("*")
    .then((data) => {
      console.log("it works");
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(202).json({
        message: "The data you are looking for could not be found.",
        err,
      });
    });
});

app.use(bodyParser.json());

// Edit Event
let events = [];

// // PATCH endpoint to edit an event
// app.patch('/edit_event', (req, res) => {
//   const { id, title, start, end, description, color_code } = req.body;
//   const eventIndex = events.findIndex(event => event.id === id);

//   if (eventIndex === -1) {
//     return res.status(404).json({ error: 'Event not found' });
//   }

//   events[eventIndex] = {
//     ...events[eventIndex],
//     title,
//     start,
//     end,
//     description,
//     color_code
//   };

//   res.status(200).json({ message: 'Event edited successfully', editedEventData: events[eventIndex] });
// });

app.patch("/edit_event", (req, res) => {
  const {id, title, start, end, description} = req.body;
  //console.log("ATTEMPTING TO UPDATE WITH: ", id, title, start, end, description)
  knex("calendar_events")
    .where({event_id: id})
    .update({
      title: title,
      description: description,
      start_datetime: start,
      end_datetime: end
    })
    .then(res.status(201).json({ message: "Update pushed" }));
})


// Calendar data for a specific user
// app.get('/mycalendar', function(req,res){
//   knex('calendar_events')
//     .select('*')
//     .then(data => res.status(200).json(data))
//     .catch(err => res.status(202).json({message: 'The data you are looking for could not be found.'}))
// })

// app.get('/', req, res) {
//   res.status(200).send({message: 'server is running'})
// }

// Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await knex("calendar_users").where({ username }).first();
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Join with chain_of_command table to get supervisor_id
    const chainOfCommand = await knex("calendar_users")
      .join(
        "chain_of_command",
        "calendar_users.user_id",
        "chain_of_command.subordinate_id"
      )
      .select("*")
      .where("calendar_users.user_id", user.user_id)
      .first();

    const supervisorID = chainOfCommand ? chainOfCommand.supervisor_id : null;
    const isManager = user.user_type === 1 ? false : true;

    const isSupervisor = await knex('chain_of_command')
    .where('supervisor_id', user.user_id)
    .first();

    res.status(200).json({
      userID: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      rank: user.rank,
      supervisorID: supervisorID,
      isSupervisor: !!isSupervisor,
      isManager: isManager,
      enabled: user.enabled
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get teams for account creation
app.get("/api/teams", (req, res) => {
  knex("calendar_teams")
  .select("name", "team_id")
  .then(dbres => res.status(200).json(dbres))
  .catch(err => res.status(500).json({ error: "Internal server error"}))
})

//get ranks for account creation
app.get("/api/ranks", (req, res) => {
  knex("ranks")
  .select("name", "rank_id")
  .then(dbres => res.status(200).json(dbres))
  .catch(err => res.status(500).json({ error: "Internal server error"}))
})

//get user types for account creation
app.get("/api/usertypes", (req, res) => {
  knex("user_type")
  .select("name", "user_type_id")
  .then(dbres => res.status(200).json(dbres))
  .catch(err => res.status(500).json({ error: "Internal server error"}))
})

//user account request
app.post("/api/newuser", async (req, res) => {
  const { first_name, last_name, rank, username, password, team_id, user_type } = req.body
  const user_password = await bcrypt.hash(password, 10);
  knex("calendar_users")
  .insert({
    first_name: first_name,
    last_name: last_name,
    rank: rank,
    username: username,
    password: user_password,
    team_id: team_id,
    user_type: user_type
  })
  .then(res.status(202).send("Account Request Pending"))
  .catch(err => res.status(500))
})

// Create notice
app.post("/api/notices", async (req, res) => {
  const { submitter_id, recipient_id, body, notice_type } = req.body;
  try {
    await knex("user_notice").insert({
      submitter_id,
      recipient_id,
      body,
      notice_type,
    });
    res.status(201).json({ message: "Notice created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update notice status
app.put("/api/notices", async (req, res) => {
  const { request_id, choice } = req.body;
  try {
    await knex("user_notice")
      .where({ user_notice_id: request_id })
      .update({ notice_status: choice });
    res.status(200).json({ message: "User notice updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Archive notice
app.put("/api/notices/:noticeID", async (req, res) => {
  const noticeID = req.params.noticeID;
  try {
    await knex("user_notice")
      .where({ user_notice_id: noticeID })
      .update({ archived: true });
    res.status(200).json({ message: "User notice archived successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get notices submitted to user
app.get("/api/notices/supervisor/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const notices = await knex('user_notice')
      .select(
        'user_notice.*',
        'notice_status.name as status_name',
        'notice_type.name as notice_name',
        'calendar_users.rank',
        'calendar_users.first_name',
        'calendar_users.last_name',
        'ranks.name as rank_name',
      )
      .join('notice_status', 'status_id', 'user_notice.notice_status')
      .join('notice_type', 'notice_type_id', 'user_notice.notice_type')
      .join('calendar_users', 'submitter_id', 'user_id')
      .join('ranks', 'rank_id', 'calendar_users.rank')
      .where({ recipient_id: userId, notice_status: 1, event_id: null });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get notices submitted by user
app.get("/api/notices/submitter/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const notices = await knex("user_notice")
      .select("*")
      .join("notice_status", "status_id", "user_notice.notice_status")
      .where({ submitter_id: userId });

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get supervisor's ID
app.get("/api/supervisor/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const supervisorID = await knex("chain_of_command")
      .select("supervisor_id")
      .where({ subordinate_id: userId });
    res.status(200).json(supervisorID);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get Team Calendar Events
app.get("/api/teamview/:userId", async (req, res) => {
  const userId = req.params.userId;
  knex("calendar_users")
    .select(
      "calendar_users.user_id",
      "first_name",
      "last_name",
      "event_type.name as event_type",
      "title",
      "calendar_events.description",
      "start_datetime",
      "end_datetime",
      "all_day",
      "creator_id",
      "ranks.name AS rank",
      "calendar_teams.name AS team_name"
    )
    .join("calendar_events","calendar_users.user_id","=","calendar_events.user_id")
    .join("ranks", "calendar_users.rank", "=", "ranks.rank_id")
    .join("event_type", "calendar_events.event_type", "=", "event_type.event_id")
    .join("calendar_teams", "calendar_teams.team_id", "calendar_users.team_id")
    //.where("calendar_users.supervisor_id", userId)
    .then((dbres) => res.status(200).json(dbres))
    .catch((err) => res.status(500).json({ err: "Internal server error : ", err }));
});

// app.get("/aaa", (req, res) => {
//   knex("calendar_events")
//     .select("*")
//     .then((data) => res.status(200).json(data));
// });

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
  console.log("ATTEMPTING TO CREATE EVENT WITH: ", event_data);
  // //DIAGNOSTIC RETURN OF ALL EVENTS
  // knex("calendar_events")
  //   .select("*")
  //   .then((data) => res.status(200).json(data));

  knex("calendar_events")
    .insert({
      title: event_data.title,
      description: event_data.description,
      start_datetime: event_data.start_datetime,
      end_datetime: event_data.end_datetime,
      all_day: event_data.all_day,
      team_id: event_data.team_id,
      user_id: event_data.user_id,
      event_type: event_data.event_type,
      creator_id: event_data.creator_id,
      pending: event_data.pending,
      approved: event_data.approved
    })
    .returning('event_id')
    .then((newID) => {
      const calendar_event_id = newID[0];
      res.status(201).json({ status: "INSERTED", new_event_id: calendar_event_id })
    })

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

//THIS CALL RETURNS ALL CALANDAR EVENTS
app.get("/events", (req, res) => {
  knex("calendar_events")
    .select("*")
    .then((data) => res.status(200).json(data));
})

// Get all pending calendar events
app.get("/api/events/pending", async (req, res) => {
  try {
    const pendingEvents = await knex("calendar_events")
      .select(
        "calendar_events.*",
        'calendar_users.rank',
        'calendar_users.first_name',
        'calendar_users.last_name',
        'ranks.name as rank_name',
        'event_type.name as event_type_name',
        'user_notice.user_notice_id',
        'user_notice.recipient_id'
      )
      .join('calendar_users', 'creator_id', 'calendar_users.user_id')
      .join('ranks', 'rank_id', 'calendar_users.rank')
      .join('event_type', 'calendar_events.event_type', 'event_type.event_id')
      .join('user_notice', 'calendar_events.event_id', 'user_notice.event_id')
      .where("calendar_events.pending", true)
    res.status(200).json(pendingEvents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Get all pending account request
app.get("/api/accounts/pending", async (req, res) => {
  try {
    const pendingAccounts = await knex("calendar_users")
      .select(
        "calendar_users.*",
        'ranks.name as rank_name',
        'user_type.name as user_type_name',
      )
      .join('ranks', 'rank_id', 'calendar_users.rank')
      .join('user_type', 'calendar_users.user_type', 'user_type.user_type_id')
      .where("calendar_users.pending", true)
    res.status(200).json(pendingAccounts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Approve/Deny calendar events
app.put("/api/events/choice", async (req, res) => {
  const { event_id, choice } = req.body;
  try {
    const pendingEvents = await knex("calendar_events").where("event_id", event_id).update({pending: false, approved: choice});
    res.status(200).json(pendingEvents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Create auto generated notice during event creation or edit
app.post("/api/notices/auto", async (req, res) => {
  const { submitter_id, body, notice_type, event_id, recipient_id } = req.body;
  try {
    await knex("user_notice").insert({
      submitter_id,
      body,
      notice_type,
      event_id,
      recipient_id
    });
    res.status(201).json({ message: "Notice created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Approve/Deny account request
app.put("/api/accounts/choice", async (req, res) => {
  const { user_id, approved, pending } = req.body;
  try {
    const pendingAccounts = await knex("calendar_users").where("user_id", user_id).update({pending: pending, approved: approved});
    res.status(200).json(pendingAccounts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Get team member user_id's
app.get("/api/teammembers/:teamId", async (req, res) => {
  const teamID = req.params.teamId;
  try {
    const teamMembers = await knex("calendar_users")
      .select("user_id")
      .where("team_id", teamID)
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
