create database nomoregames;
use nomoregames;

create table avatar (
idAvatar int primary key auto_increment,
url varchar(50)
);

insert into avatar values
	(null, './assets/imgs/icon0.webp'),
	(null, './assets/imgs/icon1.webp'),
	(null, './assets/imgs/icon2.webp'),
	(null, './assets/imgs/icon3.webp'),
	(null, './assets/imgs/icon4.webp'),
	(null, './assets/imgs/icon5.webp');

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fkAvatar int, 
    foreign key (fkAvatar) references avatar(idAvatar)
);

select * from usuario;
select * from usuario join avatar on fkavatar = idavatar;