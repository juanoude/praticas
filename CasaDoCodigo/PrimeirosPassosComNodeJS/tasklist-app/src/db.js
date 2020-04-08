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
  CREATE TABLE `tasks`.`tasks` (
	id INT(11)  NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    description VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
  )ENGINE=InnoDB;

  CREATE TABLE `tasks`.`users` (
	  `id` INT(11)  NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`id`)
  )ENGINE=InnoDB;

  -- User Seeds
  INSERT INTO tasks.users(`username`, `password`) VALUES ('admin', 'admin');
  INSERT INTO tasks.users(`username`, `password`) VALUES ('user', 'user');
  SELECT * FROM tasks.users;
*/