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

/* 
CREATE TABLE `musics`.`musicas` (
	`id` int NOT NULL AUTO_INCREMENT,
    `nome` varchar(30) NOT NULL,
    `artista` varchar(30) NOT NULL,
    `estrelas` INT NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;

CREATE TABLE `musics`.`users` (
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `password` varchar(30) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;

DROP TABLE musics.users;
ALTER TABLE musics.users CHANGE COLUMN `name` `username` VARCHAR(30);

-- Musicas Seeds
INSERT INTO `musics`.`musicas` (`nome`, `artista`, `estrelas`) VALUES ('Youtube Rapper', 'Token', 3);
INSERT INTO `musics`.`musicas` (`nome`, `artista`, `estrelas`) VALUES ('Treehouse', 'Token', 3);
INSERT INTO `musics`.`musicas` (`nome`, `artista`, `estrelas`) VALUES ('The Ringer', 'Eminem', 3);
INSERT INTO `musics`.`musicas` (`nome`, `artista`, `estrelas`) VALUES ('The Greatest', 'Eminem', 3);
INSERT INTO `musics`.`musicas` (`nome`, `artista`, `estrelas`) VALUES ('The Outsider', 'Perfect Circle', 3);
INSERT INTO `musics`.`musicas` (`nome`, `artista`, `estrelas`) VALUES ('The Pot', 'Tool', 3);

-- User Seeds
INSERT INTO musics.users(`name`, `password`) VALUES ('admin', 'admin');
INSERT INTO musics.users(`name`, `password`) VALUES ('user', 'user');
SELECT * FROM musics.users;
 */
