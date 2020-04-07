var knex = require('knex');

var db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'mercurio',
    database: 'tasklist'
  }
});

module.exports = db;


/*
  


*/