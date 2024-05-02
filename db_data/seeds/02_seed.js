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
    { name: 'Shift Work', description: '12 Hour Shift', color_code: '99A3A4'},
    { name: 'Appointment', description: 'Offical Appointment', color_code: 'FF5733' },
    { name: 'Meeting', description: 'Regular Meeting', color_code: '3498DB' },
    { name: 'Training', description: 'Training Session', color_code: '2ECC71' },
    { name: 'Holiday', description: 'Public Holiday', color_code: 'E74C3C' },
    { name: 'Leave', description: 'Personal Leave', color_code: '9B59B6' },
    { name: 'TDY', description: 'Member TDY', color_code: 'F1C40F' },
    { name: 'Deployed', description: 'Member Deployed', color_code: '1ABC9C'},
    { name: 'Misc', description: 'All Other Events', color_code: '0E9FAE'}
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
    { first_name: 'Olivia', last_name: 'Thomas', rank: 1, username: 'oliviathomas', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: true, pending: false },
    { first_name: 'James', last_name: 'Allen', rank: 4, username: 'jamesallen', user_type: 1, team_id: 2, password: await bcrypt.hash('password', 10), enabled: false, pending: true }
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
    { supervisor_id: 14, subordinate_id: 20 },
    { supervisor_id: 1, subordinate_id: 21 }
  ]);

  // Seed user_notice table
  await knex('user_notice').insert([
    { notice_status: 1, submitter_id: 8, recipient_id: 3, body: 'Is team lunch still on?', notice_type: 1 },
    { notice_status: 1, submitter_id: 9, recipient_id: 8, body: 'Have any details about the Networking event?', notice_type: 2 },
    { notice_status: 1, submitter_id: 10, recipient_id: 8, body: 'Is Mentorship training open to everyone?', notice_type: 3 },
    { notice_status: 1, submitter_id: 5, recipient_id: 4, body: "Any upcoming TDYs?", notice_type: 3 },
    { notice_status: 1, submitter_id: 6, recipient_id: 4, body: 'Can I deploy?', notice_type: 1 },
    { notice_status: 1, submitter_id: 3, recipient_id: 1, body: "Spc Allen's account is still pending approval.", notice_type: 2 },
    { notice_status: 1, submitter_id: 13, recipient_id: 12, body: 'Can I be signed up for SABC training?', notice_type: 2 },
    { notice_status: 1, submitter_id: 15, recipient_id: 14, body: 'What is the software development workshop going to be about?', notice_type: 2 },
    { notice_status: 1, submitter_id: 16, recipient_id: 14, body: 'Is the product dev meeting still on?', notice_type: 2 },
    { notice_status: 1, submitter_id: 4, recipient_id: 3, body: 'Event Creation', notice_type: 4, event_id: 53 },
    { notice_status: 1, submitter_id: 5, recipient_id: 4, body: 'Event Creation', notice_type: 4, event_id: 54 },
    { notice_status: 1, submitter_id: 3, recipient_id: 2, body: 'Event Creation', notice_type: 4, event_id: 55 }
  ]);

  // Seed calendar_events table
  await knex('calendar_events').insert([
    { title: 'Crew Ops',                      start_datetime: '2024-05-01T06:00:00', end_datetime: '2024-05-05T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-08T06:00:00', end_datetime: '2024-05-12T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true},
    { title: 'Crew Ops',                      start_datetime: '2024-05-15T06:00:00', end_datetime: '2024-05-19T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-22T06:00:00', end_datetime: '2024-05-26T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-29T06:00:00', end_datetime: '2024-06-02T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-05T06:00:00', end_datetime: '2024-06-09T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-12T06:00:00', end_datetime: '2024-06-16T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-19T06:00:00', end_datetime: '2024-06-23T18:00:00', team_id: 1, description: 'Team A Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-05T06:00:00', end_datetime: '2024-05-09T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-12T06:00:00', end_datetime: '2024-05-16T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-19T06:00:00', end_datetime: '2024-05-23T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-05-26T06:00:00', end_datetime: '2024-05-30T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-02T06:00:00', end_datetime: '2024-06-06T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-09T06:00:00', end_datetime: '2024-06-13T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-16T06:00:00', end_datetime: '2024-06-20T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Crew Ops',                      start_datetime: '2024-06-23T06:00:00', end_datetime: '2024-06-27T18:00:00', team_id: 2, description: 'Team B Crew Ops',                       event_type: 1, creator_id: 1, pending: false, approved: true, all_day: true },
    { title: 'Dental Appointment',            start_datetime: '2024-05-03T10:00:00', end_datetime: '2024-05-03T11:00:00', user_id: 4, description: 'Dentist Appointment',                   event_type: 2, creator_id: 4, pending: false, approved: true },
    { title: 'Med Appointment',               start_datetime: '2024-05-10T14:00:00', end_datetime: '2024-05-10T15:00:00', user_id: 5, description: 'Med Appointment',                       event_type: 2, creator_id: 5, pending: false, approved: true },
    { title: 'Project Review Meeting',        start_datetime: '2024-05-04T09:00:00', end_datetime: '2024-05-04T11:00:00', team_id: 1, description: 'Team G Project Review Meeting',         event_type: 3, creator_id: 6, pending: false, approved: true },
    { title: 'First Aid Training',            start_datetime: '2024-05-03T13:00:00', end_datetime: '2024-05-03T16:00:00', user_id: 8, description: 'Team I First Aid Training',             event_type: 4, creator_id: 8, pending: false, approved: true },
    { title: 'Leave',                         start_datetime: '2024-06-06T00:00:00', end_datetime: '2024-06-10T23:59:59', user_id: 13, description: 'Annual Leave',                         event_type: 6, creator_id: 13, pending: false, approved: true, all_day: true },
    { title: 'Leave',                         start_datetime: '2024-06-13T00:00:00', end_datetime: '2024-06-14T23:59:59', user_id: 4, description: 'Sick Leave',                            event_type: 6, creator_id: 4, pending: false, approved: true, all_day: true },
    { title: 'TDY',                           start_datetime: '2024-05-03T06:00:00', end_datetime: '2024-05-09T18:00:00', user_id: 14, description: 'Temporary Duty Assignment',            event_type: 7, creator_id: 14, pending: false, approved: true, all_day: true },
    { title: 'TDY',                           start_datetime: '2024-05-10T06:00:00', end_datetime: '2024-05-16T18:00:00', user_id: 15, description: 'Temporary Duty Assignment',            event_type: 7, creator_id: 15, pending: false, approved: true, all_day: true },
    { title: 'TDY',                           start_datetime: '2024-05-20T06:00:00', end_datetime: '2024-05-25T18:00:00', user_id: 6, description: 'Temporary Duty Assignment',             event_type: 7, creator_id: 6, pending: false, approved: true, all_day: true },
    { title: 'TDY',                           start_datetime: '2024-05-25T06:00:00', end_datetime: '2024-05-30T18:00:00', user_id: 9, description: 'Temporary Duty Assignment',             event_type: 7, creator_id: 9, pending: false, approved: true, all_day: true },
    { title: 'Deployment',                    start_datetime: '2024-02-17T00:00:00', end_datetime: '2024-08-02T23:59:59', user_id: 19, description: 'Deployment',                           event_type: 8, creator_id: 19, pending: false, approved: true, all_day: true },
    { title: 'Deployment',                    start_datetime: '2024-02-25T00:00:00', end_datetime: '2024-08-02T23:59:59', user_id: 11, description: 'Deployment',                           event_type: 8, creator_id: 11, pending: false, approved: true, all_day: true },
    { title: 'Team Building Event',           start_datetime: '2024-05-18T09:00:00', end_datetime: '2024-05-18T17:00:00', team_id: 1, description: 'Team Building Event',                   event_type: 9, creator_id: 18, pending: false, approved: true },
    { title: 'Charity Fundraiser',            start_datetime: '2024-05-25T10:00:00', end_datetime: '2024-05-25T14:00:00', team_id: 2, description: 'Charity Fundraiser',                    event_type: 9, creator_id: 19, pending: false, approved: true },
    { title: 'Dental Appointment',            start_datetime: '2024-05-14T11:00:00', end_datetime: '2024-05-14T12:00:00', user_id: 2, description: 'Dentist Appointment',                   event_type: 2, creator_id: 2, pending: false, approved: true },
    { title: 'Eye Exam Appointment',          start_datetime: '2024-05-21T10:00:00', end_datetime: '2024-05-21T11:00:00', user_id: 3, description: 'Eye Exam Appointment',                  event_type: 2, creator_id: 3, pending: false, approved: true },
    { title: 'Physical Therapy Appointment',  start_datetime: '2024-05-28T14:00:00', end_datetime: '2024-05-28T15:00:00', user_id: 4, description: 'Physical Therapy Appointment',          event_type: 2, creator_id: 4, pending: false, approved: true },
    { title: 'Consultation',                  start_datetime: '2024-07-12T11:00:00', end_datetime: '2024-07-12T12:00:00', user_id: 6, description: 'Consultation',                          event_type: 2, creator_id: 6, pending: false, approved: true },
    { title: 'Legal Appointment',             start_datetime: '2024-07-19T16:00:00', end_datetime: '2024-07-19T17:00:00', user_id: 7, description: 'Legal Appointment',                     event_type: 2, creator_id: 7, pending: false, approved: true },
    { title: 'Car Service Appointment',       start_datetime: '2024-08-02T10:00:00', end_datetime: '2024-08-02T11:00:00', user_id: 9, description: 'Car Service Appointment',               event_type: 2, creator_id: 9, pending: false, approved: true },
    { title: 'Financial Advisor Appointment', start_datetime: '2024-08-09T15:00:00', end_datetime: '2024-08-09T16:00:00', user_id: 10, description: 'Financial Advisor Appointment',        event_type: 2, creator_id: 10, pending: false, approved: true },
    { title: 'Product Development Meeting',   start_datetime: '2024-05-20T14:00:00', end_datetime: '2024-05-20T16:00:00', team_id: 2, description: 'Product Development Meeting',           event_type: 3, creator_id: 13, pending: false, approved: true },
    { title: 'Team Review Meeting',           start_datetime: '2024-07-04T09:00:00', end_datetime: '2024-07-04T11:00:00', team_id: 1, description: 'Team Review Meeting',                   event_type: 3, creator_id: 15, pending: false, approved: true },
    { title: 'Budget Planning Meeting',       start_datetime: '2024-07-11T10:00:00', end_datetime: '2024-07-11T12:00:00', team_id: 1, description: 'Budget Planning Meeting',               event_type: 3, creator_id: 16, pending: false, approved: true },
    { title: 'Quarterly Review Meeting',      start_datetime: '2024-07-18T11:00:00', end_datetime: '2024-07-18T13:00:00', team_id: 2, description: 'Quarterly Review Meeting',              event_type: 3, creator_id: 17, pending: false, approved: true },
    { title: 'Training Program Meeting',      start_datetime: '2024-07-25T14:00:00', end_datetime: '2024-07-25T16:00:00', team_id: 2, description: 'Training Program Meeting',              event_type: 3, creator_id: 18, pending: false, approved: true },
    { title: 'Strategic Planning Meeting',    start_datetime: '2024-08-08T09:00:00', end_datetime: '2024-08-08T11:00:00', team_id: 1, description: 'Strategic Planning Meeting',            event_type: 3, creator_id: 20, pending: false, approved: true },
    { title: 'Team Lunch',                    start_datetime: '2024-05-09T12:00:00', end_datetime: '2024-05-09T13:00:00', team_id: 1, description: 'Team Lunch',                            event_type: 9, creator_id: 1, pending: false, approved: true },
    { title: 'Office Party',                  start_datetime: '2024-05-14T17:00:00', end_datetime: '2024-05-14T20:00:00', team_id: 2, description: 'Office Party',                          event_type: 9, creator_id: 2, pending: false, approved: true },
    { title: 'Networking Event',              start_datetime: '2024-05-21T18:00:00', end_datetime: '2024-05-21T20:00:00', team_id: 1, description: 'Networking Event',                      event_type: 9, creator_id: 3, pending: false, approved: true },
    { title: 'Team Building Activity',        start_datetime: '2024-07-05T14:00:00', end_datetime: '2024-07-05T16:00:00', team_id: 1, description: 'Team Building Activity',                event_type: 9, creator_id: 5, pending: false, approved: true },
    { title: 'Leadership Training',           start_datetime: '2024-05-08T09:00:00', end_datetime: '2024-05-08T12:00:00', user_id: 1, description: 'Leadership Training Session',           event_type: 4, creator_id: 1, pending: false, approved: true },
    { title: 'Software Development Workshop', start_datetime: '2024-05-13T13:00:00', end_datetime: '2024-05-13T16:00:00', team_id: 2, description: 'Software Development Workshop',         event_type: 4, creator_id: 2, pending: false, approved: true },
    { title: 'Project Management Training',   start_datetime: '2024-05-27T14:00:00', end_datetime: '2024-05-27T16:00:00', team_id: 2, description: 'Project Management Training Session',   event_type: 4, creator_id: 4, pending: false, approved: true },
    { title: 'Mentorship Training',           start_datetime: '2024-05-10T13:00:00', end_datetime: '2024-05-10T16:00:00', team_id: 1, description: 'Training session on mentorship',        event_type: 4, creator_id: 4 },
    { title: 'SABC Training',                 start_datetime: '2024-05-15T10:00:00', end_datetime: '2024-05-15T12:00:00', user_id: 5, description: 'Training session for SABC',             event_type: 4, creator_id: 5 },
    { title: 'SABC Training',                 start_datetime: '2024-05-01T10:00:00', end_datetime: '2024-05-01T12:00:00', user_id: 6, description: 'Training session for SABC',             event_type: 4, creator_id: 6 }
  ]);
};
