module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '0.0.0.0',
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