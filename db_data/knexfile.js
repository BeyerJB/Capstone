module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      user: 'postgres',
      password: 'docker',
      database: 'schedule'
    }
  },

  staging: { // leave this unchanged

  },

  production: { // leave this unchanged

  },
};