CREATE DATABASE IF NOT EXISTS personalapp;

USE personalapp;

CREATE TABLE usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) DEFAULT NULL,
    email VARCHAR(200) NOT NULL,
    is_admin VARCHAR(1) NOT NULL DEFAULT 'N',
    fecha_alta DATE NOT NULL DEFAULT (NOW()),
    fecha_baja DATE DEFAULT NULL,
    PRIMARY KEY (id, username),
    UNIQUE INDEX username_unique (username ASC),
    UNIQUE INDEX email_unique (email ASC)
);

DESCRIBE usuarios;

INSERT INTO usuarios VALUES 
    (1, 'ruben', 'CarlaCuadrado#7', 'Rubén', 'rbi1957@gmail.com', 'S')