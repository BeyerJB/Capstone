const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Seed ranks table
  await knex('ranks').insert([
    { name: 'Spc 1' },
    { name: 'Spc 2' },
    { name: 'Spc 3' },
    { name: 'Spc 4' },
    { name: 'Sgt' },
    { name: 'TSgt' },
    { name: 'MSgt' },
    { name: 'SMSgt' },
    { name: 'CMSgt' },
    { name: '2d Lt' },
    { name: '1st Lt' },
    { name: 'Capt' },
    { name: 'Maj' },
    { name: 'Lt Col' },
    { name: 'Col' },
    { name: 'Brig Gen' },
    { name: 'Maj Gen' },
    { name: 'Lt Gen' },
    { name: 'Gen' }
  ])

  // Seed user_type table
  await knex('user_type').insert([
    { name: 'Standard', description: 'Regular user' },
    { name: 'Manager', description: 'Able to change schedule' }
  ]);

  // Seed notice_status table
  await knex('notice_status').insert([
    { name: 'Pending', description: 'Notice is pending' },
    { name: 'Approved', description: 'Notice is approved' },
    { name: 'Rejected', description: 'Notice is rejected' },
  ]);

  // Seed notice_type table
  await knex('notice_type').insert([
    { name: 'General', description: 'General notice' },
    { name: 'Urgent', description: 'Urgent notice' },
    { name: 'Reminder', description: 'Reminder notice' },
    { name: 'Automated', description: 'Generated on event creation, only visible to creator'}
  ]);

  // Seed calendar_teams table
  await knex('calendar_teams').insert([
    { name: 'Team A', description: 'Description for Team A' },
    { name: 'Team B', description: 'Description for Team B' }
  ]);

  // Seed event_type table
  await knex('event_type').insert([
    { name: 'Shift Work'. description: '12 Hour Shift', color_code: '99A3A4'},
    { name: 'Appointment', description: 'Offical Appointment', color_code: 'FF5733' },
    { name: 'Meeting', description: 'Regular Meeting', color_code: '3498DB' },
    { name: 'Training', description: 'Training Session', color_code: '2ECC71' },
    { name: 'Holiday', description: 'Public Holiday', color_code: 'E74C3C' },
    { name: 'Leave', description: 'Personal Leave', color_code: '9B59B6' },
    { name: 'TDY', description: 'Member TDY', color_code: 'F1C40F' },
    { name: 'Deployed', description: 'Member Deployed', color_code: '1ABC9C'},
    { name: 'Misc', description: 'All Other Events', color_code: '95A5A6'}
  ]);

  // Seed calendar_users table
  await knex('calendar_users').insert([
    { first_name: 'John', last_name: 'Doe', rank: 8, username: 'johndoe', user_type: 2, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Alice', last_name: 'Smith', rank: 7, username: 'alicesmith', user_type: 2, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Alexander', last_name: 'Lee', rank: 6, username: 'alexanderlee', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Mia', last_name: 'Harris', rank: 5, username: 'miaharris', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'James', last_name: 'Clark', rank: 4, username: 'jamesclark', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Sophia', last_name: 'Moore', rank: 3, username: 'sophiamoore', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Daniel', last_name: 'Hernandez', rank: 2, username: 'danielhernandez', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Emma', last_name: 'White', rank: 5, username: 'emmawhite', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Ethan', last_name: 'Lopez', rank: 4, username: 'ethanlopez', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Isabella', last_name: 'Martinez', rank: 3, username: 'isabellamartinez', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'William', last_name: 'Wang', rank: 2, username: 'williamwang', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Bob', last_name: 'Johnson', rank: 7, username: 'bobjohnson', user_type: 2, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Matthew', last_name: 'Anderson', rank: 6, username: 'matthewanderson', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Sarah', last_name: 'Taylor', rank: 5, username: 'sarahtaylor', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'David', last_name: 'Martinez', rank: 4, username: 'davidmartinez', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Emily', last_name: 'Wilson', rank: 3, username: 'emilywilson', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Michael', last_name: 'Davis', rank: 2, username: 'michaeldavis', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Jane', last_name: 'Brown', rank: 1, username: 'janebrown', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Ava', last_name: 'Garcia', rank: 1, username: 'avagarcia', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'Olivia', last_name: 'Thomas', rank: 1, username: 'oliviathomas', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false }
  ]);

  // Seed chain_of_command table
  await knex('chain_of_command').insert([
    { supervisor_id: 1, subordinate_id: 2},
    { supervisor_id: 1, subordinate_id: 12},
    { supervisor_id: 2, subordinate_id: 3 },
    { supervisor_id: 3, subordinate_id: 4 },
    { supervisor_id: 3, subordinate_id: 8 },
    { supervisor_id: 4, subordinate_id: 5 },
    { supervisor_id: 4, subordinate_id: 6 },
    { supervisor_id: 4, subordinate_id: 7 },
    { supervisor_id: 8, subordinate_id: 9 },
    { supervisor_id: 8, subordinate_id: 10 },
    { supervisor_id: 8, subordinate_id: 11 },
    { supervisor_id: 12, subordinate_id: 13 },
    { supervisor_id: 13, subordinate_id: 14 },
    { supervisor_id: 14, subordinate_id: 15 },
    { supervisor_id: 14, subordinate_id: 16 },
    { supervisor_id: 14, subordinate_id: 17 },
    { supervisor_id: 14, subordinate_id: 18 },
    { supervisor_id: 14, subordinate_id: 19 },
    { supervisor_id: 14, subordinate_id: 20 }
  ]);

  // Seed user_notice table
  await knex('user_notice').insert([
    { notice_status: 1, submitter_id: 10, recipient_id: 8, body: 'Test notice 1', notice_type: 1 },
    { notice_status: 1, submitter_id: 13, recipient_id: 12, body: 'Test notice 2', notice_type: 2 },
    { notice_status: 1, submitter_id: 5, recipient_id: 4, body: 'Test notice 3', notice_type: 3 },
    { notice_status: 1, submitter_id: 7, recipient_id: 4, body: 'Test notice 4', notice_type: 3 },
    { notice_status: 1, submitter_id: 17, recipient_id: 14, body: 'Test notice 5', notice_type: 1 },
    { notice_status: 1, submitter_id: 2, recipient_id: 1, body: 'Test notice 6', notice_type: 2 },
    { notice_status: 1, submitter_id: 12, recipient_id: 4, body: 'Test notice 7', notice_type: 2 },
    { notice_status: 1, submitter_id: 13, recipient_id: 12, body: 'Test notice 8', notice_type: 2 },
    { notice_status: 1, submitter_id: 20, recipient_id: 14, body: 'Test notice 9', notice_type: 2 },
    { notice_status: 1, submitter_id: 4, recipient_id: 3, body: 'Event Creation', notice_type: 4, event_id: 34 },
    { notice_status: 1, submitter_id: 5, recipient_id: 4, body: 'Event Creation', notice_type: 4, event_id: 35 },
    { notice_status: 1, submitter_id: 6, recipient_id: 2, body: 'Event Creation', notice_type: 4, event_id: 36 }
  ]);

  // Seed calendar_events table
  await knex('calendar_events').insert([
    { title: "Brainstorming Session", start_datetime: "2024-05-10T09:00:00", end_datetime: "2024-05-10T11:00:00", team_id: 1, description: "Brainstorming ideas for upcoming project", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Client Feedback Session", start_datetime: "2024-05-14T14:00:00", end_datetime: "2024-05-14T16:00:00", team_id: 1, description: "Gathering feedback from client interactions", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Client Presentation Preparation", start_datetime: "2024-05-04T13:00:00", end_datetime: "2024-05-04T15:00:00", team_id: 1, description: "Preparing slides and materials for client presentation", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Client Presentation", start_datetime: "2024-05-02T10:00:00", end_datetime: "2024-05-02T12:00:00", user_id: 14, description: "Presenting project updates to client ABC", event_type: 2, creator_id: 2, pending: false, approved: true },
    { title: "Holiday 2", start_datetime: "2024-05-05T00:00:00", end_datetime: "2024-05-05T23:59:59", team_id: 1, description: "Public holiday", event_type: 4, creator_id: 2, pending: false, approved: true },
    { title: "Meeting 3", start_datetime: "2024-05-01T11:00:00", end_datetime: "2024-05-01T12:00:00", team_id: 1, description: "Weekly team meeting", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Meeting 4", start_datetime: "2024-05-08T11:00:00", end_datetime: "2024-05-08T12:00:00", team_id: 2, description: "Weekly team meeting", event_type: 2, creator_id: 2, pending: false, approved: true },
    { title: "Meeting 5", start_datetime: "2024-05-12T11:00:00", end_datetime: "2024-05-12T12:00:00", team_id: 1, description: "Weekly team meeting", event_type: 2, creator_id: 3, pending: false, approved: true },
    { title: "Product Launch", start_datetime: "2024-05-09T09:00:00", end_datetime: "2024-05-09T10:30:00", team_id: 2, description: "Launching new product", event_type: 2, creator_id: 3, pending: false, approved: true },
    { title: "Project Deadline", start_datetime: "2024-05-02T00:00:00", end_datetime: "2024-05-02T23:59:59", team_id: 1, description: "Project ABC deadline", event_type: 2, creator_id: 2, pending: false, approved: true },
    { title: "Project Kickoff", start_datetime: "2024-05-04T14:00:00", end_datetime: "2024-05-04T15:00:00", team_id: 2, description: "Kickoff meeting for project XYZ", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Project Planning Session", start_datetime: "2024-05-02T09:00:00", end_datetime: "2024-05-02T11:00:00", team_id: 1, description: "Planning upcoming project milestones", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Project Review Meeting", start_datetime: "2024-05-12T11:00:00", end_datetime: "2024-05-12T12:00:00", team_id: 1, description: "Reviewing project milestones and deliverables", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Project Review", start_datetime: "2024-05-14T14:00:00", end_datetime: "2024-05-14T15:30:00", team_id: 1, description: "Reviewing project progress", event_type: 2, creator_id: 2, pending: false, approved: true },
    { title: "Project Status Update Meeting", start_datetime: "2024-05-07T11:00:00", end_datetime: "2024-05-07T12:00:00", team_id: 1, description: "Meeting to discuss project status", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Random Meeting 7", start_datetime: "2024-05-12T11:00:00", end_datetime: "2024-05-12T12:00:00", team_id: 1, description: "Weekly team meeting", event_type: 2, creator_id: 20 },
    { title: "Random Meeting 8", start_datetime: "2024-05-13T11:00:00", end_datetime: "2024-05-13T12:00:00", team_id: 2, description: "Weekly team meeting", event_type: 2, creator_id: 17 },
    { title: "Team Bonding Activity", start_datetime: "2024-05-17T13:00:00", end_datetime: "2024-05-17T15:00:00", team_id: 1, description: "Team bonding activity at local park", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Team Building Exercise", start_datetime: "2024-05-05T09:00:00", end_datetime: "2024-05-05T12:00:00", team_id: 1, description: "Outdoor team building activities", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Team Lunch 2", start_datetime: "2024-05-11T12:30:00", end_datetime: "2024-05-11T13:30:00", team_id: 1, description: "Team lunch at local restaurant", event_type: 2, creator_id: 2, pending: false, approved: true },
    { title: "Team Lunch 3", start_datetime: "2024-05-08T12:30:00", end_datetime: "2024-05-08T13:30:00", team_id: 1, description: "Team lunch at new restaurant", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Team Lunch", start_datetime: "2024-05-01T12:30:00", end_datetime: "2024-05-01T13:30:00", team_id: 2, description: "Team lunch at local restaurant", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Team Presentation Practice", start_datetime: "2024-05-15T09:00:00", end_datetime: "2024-05-15T11:00:00", team_id: 1, description: "Practicing presentation for upcoming conference", event_type: 2, creator_id: 1, pending: false, approved: true },
    { title: "Team Retreat", start_datetime: "2024-05-06T09:00:00", end_datetime: "2024-05-06T17:00:00", team_id: 2, description: "Team building retreat", event_type: 2, creator_id: 3, pending: false, approved: true },
    { title: "Team Training Workshop", start_datetime: "2024-05-03T10:00:00", end_datetime: "2024-05-03T14:00:00", team_id: 1, description: "Workshop on team communication skills", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 10", start_datetime: "2024-05-06T10:00:00", end_datetime: "2024-05-06T12:00:00", user_id: 5, description: "Training session on conflict resolution", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 11", start_datetime: "2024-05-09T10:00:00", end_datetime: "2024-05-09T12:00:00", user_id: 9, description: "Training session on project management tools", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 12", start_datetime: "2024-05-11T13:00:00", end_datetime: "2024-05-11T15:00:00", user_id: 12, description: "Training session on presentation skills", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 13", start_datetime: "2024-05-13T10:00:00", end_datetime: "2024-05-13T12:00:00", user_id: 15, description: "Training session on teamwork dynamics", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 14", start_datetime: "2024-05-16T10:00:00", end_datetime: "2024-05-16T12:00:00", user_id: 19, description: "Training session on negotiation skills", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 4", start_datetime: "2024-05-03T13:00:00", end_datetime: "2024-05-03T16:00:00", user_id: 12, description: "Training session on communication skills", event_type: 3, creator_id: 3, pending: false, approved: true },
    { title: "Training 5", start_datetime: "2024-05-03T09:00:00", end_datetime: "2024-05-03T11:00:00", user_id: 15, description: "Training session on project management", event_type: 3, creator_id: 3, pending: false, approved: true },
    { title: "Training 6", start_datetime: "2024-05-07T10:00:00", end_datetime: "2024-05-07T12:00:00", user_id: 19, description: "Training session on customer service", event_type: 3, creator_id: 1, pending: false, approved: true },
    { title: "Training 7", start_datetime: "2024-05-10T13:00:00", end_datetime: "2024-05-10T16:00:00", team_id: 1, description: "Training session on sales techniques", event_type: 3, creator_id: 4,},
    { title: "Training 8", start_datetime: "2024-05-13T10:00:00", end_datetime: "2024-05-13T12:00:00", user_id: 5, description: "Training session on time management", event_type: 3, creator_id: 5, },
    { title: "Training 9", start_datetime: "2024-05-01T10:00:00", end_datetime: "2024-05-01T12:00:00", user_id: 6, description: "Training session on leadership skills", event_type: 3, creator_id: 6 }
  ]);
};
