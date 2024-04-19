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
    { name: 'Rejected', description: 'Notice is rejected' }
  ]);

  // Seed notice_type table
  await knex('notice_type').insert([
    { name: 'General', description: 'General notice' },
    { name: 'Urgent', description: 'Urgent notice' },
    { name: 'Reminder', description: 'Reminder notice' }
  ]);

  // Seed calendar_teams table
  await knex('calendar_teams').insert([
    { name: 'Team A', description: 'Description for Team A' },
    { name: 'Team B', description: 'Description for Team B' }
  ]);

  // Seed event_type table
  await knex('event_type').insert([
    { name: 'Meeting', description: 'Regular meeting' },
    { name: 'Training', description: 'Training session' },
    { name: 'Holiday', description: 'Public holiday' },
    { name: 'Leave', description: 'Personal Leave' }
  ]);

  // Seed calendar_users table
  await knex('calendar_users').insert([
    { first_name: 'John', last_name: 'Doe', rank: 8, username: 'johndoe', user_type: 2, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Alice', last_name: 'Smith', rank: 7, username: 'alicesmith', user_type: 2, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Bob', last_name: 'Johnson', rank: 7, username: 'bobjohnson', user_type: 2, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Jane', last_name: 'Brown', rank: 1, username: 'janebrown', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Michael', last_name: 'Davis', rank: 2, username: 'michaeldavis', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Emily', last_name: 'Wilson', rank: 3, username: 'emilywilson', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'David', last_name: 'Martinez', rank: 4, username: 'davidmartinez', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Sarah', last_name: 'Taylor', rank: 5, username: 'sarahtaylor', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Matthew', last_name: 'Anderson', rank: 6, username: 'matthewanderson', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Olivia', last_name: 'Thomas', rank: 1, username: 'oliviathomas', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Daniel', last_name: 'Hernandez', rank: 2, username: 'danielhernandez', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Sophia', last_name: 'Moore', rank: 3, username: 'sophiamoore', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'James', last_name: 'Clark', rank: 4, username: 'jamesclark', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Emma', last_name: 'White', rank: 5, username: 'emmawhite', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Alexander', last_name: 'Lee', rank: 6, username: 'alexanderlee', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Ava', last_name: 'Garcia', rank: 1, username: 'avagarcia', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'William', last_name: 'Wang', rank: 2, username: 'williamwang', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Isabella', last_name: 'Martinez', rank: 3, username: 'isabellamartinez', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) },
    { first_name: 'Ethan', last_name: 'Lopez', rank: 4, username: 'ethanlopez', user_type: 1, team_id: 1, password: await bcrypt.hash('password', 10) },
    { first_name: 'Mia', last_name: 'Harris', rank: 5, username: 'miaharris', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10) }
  ]);

  // Seed chain_of_command table
  await knex('chain_of_command').insert([
    { supervisor_id: 1, subordinate_id: 4 },
    { supervisor_id: 1, subordinate_id: 5 },
    { supervisor_id: 1, subordinate_id: 6 },
    { supervisor_id: 1, subordinate_id: 7 },
    { supervisor_id: 1, subordinate_id: 8 },
    { supervisor_id: 1, subordinate_id: 9 },
    { supervisor_id: 2, subordinate_id: 10 },
    { supervisor_id: 2, subordinate_id: 11 },
    { supervisor_id: 2, subordinate_id: 12 },
    { supervisor_id: 2, subordinate_id: 13 },
    { supervisor_id: 2, subordinate_id: 14 },
    { supervisor_id: 2, subordinate_id: 15 },
    { supervisor_id: 3, subordinate_id: 16 },
    { supervisor_id: 3, subordinate_id: 17 },
    { supervisor_id: 3, subordinate_id: 18 },
    { supervisor_id: 3, subordinate_id: 19 },
    { supervisor_id: 3, subordinate_id: 20 }
  ]);

  // Seed user_notice table
  await knex('user_notice').insert([
    { notice_status: 1, submitter_id: 10, recipient_id: 2, body: 'Test notice 1', notice_type: 1 },
    { notice_status: 1, submitter_id: 13, recipient_id: 2, body: 'Test notice 2', notice_type: 2 },
    { notice_status: 1, submitter_id: 5, recipient_id: 1, body: 'Test notice 3', notice_type: 3 },
    { notice_status: 1, submitter_id: 7, recipient_id: 1, body: 'Test notice 3', notice_type: 3 },
    { notice_status: 1, submitter_id: 17, recipient_id: 3, body: 'Test notice 4', notice_type: 1 },
    { notice_status: 1, submitter_id: 20, recipient_id: 3, body: 'Test notice 5', notice_type: 2 }
  ]);

  // Seed calendar_events table
  await knex('calendar_events').insert([
    { title: 'Meeting 1', start_date: '2024-04-19', end_date: '2024-04-19', start_time: '10:00:00', end_time: '11:00:00', user_id: 1, description: 'Weekly team meeting', event_type: 1, creator_id: 1 },
    { title: 'Training 1', start_date: '2024-04-20', end_date: '2024-04-20', start_time: '09:00:00', end_time: '12:00:00', user_id: 2, description: 'Training session', event_type: 2, creator_id: 2 },
    { title: 'Holiday 1', start_date: '2024-04-21', end_date: '2024-04-21', start_time: '00:00:00', end_time: '23:59:59', user_id: 3, description: 'Public holiday', event_type: 3, creator_id: 3 },
    { title: 'Meeting 2', start_date: '2024-04-22', end_date: '2024-04-22', start_time: '11:00:00', end_time: '12:00:00', team_id: 1, description: 'Weekly team meeting', event_type: 1, creator_id: 1 },
    { title: 'Training 2', start_date: '2024-04-23', end_date: '2024-04-23', start_time: '13:00:00', end_time: '16:00:00', user_id: 5, description: 'Training session', event_type: 2, creator_id: 2 },
    { title: 'Project Discussion', start_date: '2024-04-24', end_date: '2024-04-24', start_time: '09:00:00', end_time: '10:30:00', team_id: 1, description: 'Discussing project updates', event_type: 1, creator_id: 3 },
    { title: 'Client Meeting', start_date: '2024-04-25', end_date: '2024-04-25', start_time: '14:00:00', end_time: '15:30:00', user_id: 7, description: 'Meeting with client XYZ', event_type: 1, creator_id: 1 },
    { title: 'Team Building Event', start_date: '2024-04-26', end_date: '2024-04-26', start_time: '09:00:00', end_time: '17:00:00', team_id: 1, description: 'Team building activities', event_type: 1, creator_id: 2 },
    { title: 'Training 3', start_date: '2024-04-27', end_date: '2024-04-27', start_time: '10:00:00', end_time: '12:00:00', user_id: 9, description: 'Training session on new software', event_type: 2, creator_id: 3 },
    { title: 'Meeting 3', start_date: '2024-04-28', end_date: '2024-04-28', start_time: '11:00:00', end_time: '12:00:00', team_id: 1, description: 'Weekly team meeting', event_type: 1, creator_id: 1 },
    { title: 'Project Deadline', start_date: '2024-04-29', end_date: '2024-04-29', start_time: '00:00:00', end_time: '23:59:59', team_id: 1, description: 'Project ABC deadline', event_type: 3, creator_id: 2 },
    { title: 'Training 4', start_date: '2024-04-30', end_date: '2024-04-30', start_time: '13:00:00', end_time: '16:00:00', user_id: 12, description: 'Training session on communication skills', event_type: 2, creator_id: 3 },
    { title: 'Team Lunch', start_date: '2024-05-01', end_date: '2024-05-01', start_time: '12:30:00', end_time: '13:30:00', team_id: 2, description: 'Team lunch at local restaurant', event_type: 1, creator_id: 1 },
    { title: 'Client Presentation', start_date: '2024-05-02', end_date: '2024-05-02', start_time: '10:00:00', end_time: '12:00:00', user_id: 14, description: 'Presenting project updates to client ABC', event_type: 1, creator_id: 2 },
    { title: 'Training 5', start_date: '2024-05-03', end_date: '2024-05-03', start_time: '09:00:00', end_time: '11:00:00', user_id: 15, description: 'Training session on project management', event_type: 2, creator_id: 3 },
    { title: 'Project Kickoff', start_date: '2024-05-04', end_date: '2024-05-04', start_time: '14:00:00', end_time: '15:00:00', team_id: 2, description: 'Kickoff meeting for project XYZ', event_type: 1, creator_id: 1 },
    { title: 'Holiday 2', start_date: '2024-05-05', end_date: '2024-05-05', start_time: '00:00:00', end_time: '23:59:59', team_id: 1, description: 'Public holiday', event_type: 3, creator_id: 2 },
    { title: 'Team Retreat', start_date: '2024-05-06', end_date: '2024-05-06', start_time: '09:00:00', end_time: '17:00:00', team_id: 2, description: 'Team building retreat', event_type: 1, creator_id: 3 },
    { title: 'Training 6', start_date: '2024-05-07', end_date: '2024-05-07', start_time: '10:00:00', end_time: '12:00:00', user_id: 19, description: 'Training session on customer service', event_type: 2, creator_id: 1 },
    { title: 'Meeting 4', start_date: '2024-05-08', end_date: '2024-05-08', start_time: '11:00:00', end_time: '12:00:00', team_id: 2, description: 'Weekly team meeting', event_type: 1, creator_id: 2 },
    { title: 'Product Launch', start_date: '2024-05-09', end_date: '2024-05-09', start_time: '09:00:00', end_time: '10:30:00', team_id: 2, description: 'Launching new product', event_type: 1, creator_id: 3 },
    { title: 'Training 7', start_date: '2024-05-10', end_date: '2024-05-10', start_time: '13:00:00', end_time: '16:00:00', team_id: 2, description: 'Training session on sales techniques', event_type: 2, creator_id: 1 },
    { title: 'Team Lunch 2', start_date: '2024-05-11', end_date: '2024-05-11', start_time: '12:30:00', end_time: '13:30:00', team_id: 1, description: 'Team lunch at local restaurant', event_type: 1, creator_id: 2 },
    { title: 'Meeting 5', start_date: '2024-05-12', end_date: '2024-05-12', start_time: '11:00:00', end_time: '12:00:00', team_id: 1, description: 'Weekly team meeting', event_type: 1, creator_id: 3 },
    { title: 'Training 8', start_date: '2024-05-13', end_date: '2024-05-13', start_time: '10:00:00', end_time: '12:00:00', user_id: 5, description: 'Training session on time management', event_type: 2, creator_id: 1 },
    { title: 'Project Review', start_date: '2024-05-14', end_date: '2024-05-14', start_time: '14:00:00', end_time: '15:30:00', team_id: 1, description: 'Reviewing project progress', event_type: 1, creator_id: 2 },
    { title: 'Holiday 3', start_date: '2024-05-15', end_date: '2024-05-15', start_time: '00:00:00', end_time: '23:59:59', user_id: 7, description: 'Public holiday', event_type: 3, creator_id: 3 },
    { title: 'Team Workshop', start_date: '2024-05-16', end_date: '2024-05-16', start_time: '09:00:00', end_time: '17:00:00', team_id: 2, description: 'Team brainstorming workshop', event_type: 1, creator_id: 1 },
    { title: 'Training 9', start_date: '2024-05-17', end_date: '2024-05-17', start_time: '10:00:00', end_time: '12:00:00', user_id: 9, description: 'Training session on leadership skills', event_type: 2, creator_id: 2 },
    { title: 'Meeting 6', start_date: '2024-05-18', end_date: '2024-05-18', start_time: '11:00:00', end_time: '12:00:00', team_id: 1, description: 'Weekly team meeting', event_type: 1, creator_id: 3 }
  ]);
};
