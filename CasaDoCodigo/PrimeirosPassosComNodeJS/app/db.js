var knex = require('knex');

var db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'mercurio',
    database: 'musics'
  }
});

module.exports = db;