DROP DATABASE IF EXISTS nomoregames;
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
	(null, './assets/imgs/icon5.webp'),
	(null, './assets/imgs/icon6.webp'),
    (null, './assets/imgs/icon7.webp'),
    (null, './assets/imgs/icon8.webp'),
    (null, './assets/imgs/icon9.webp'),
    (null, './assets/imgs/icon10.webp'),
	(null, './assets/imgs/icon11.webp'),
	(null, './assets/imgs/icon12.webp'),
	(null, './assets/imgs/icon13.webp'),
	(null, './assets/imgs/icon14.webp'),
	(null, './assets/imgs/icon15.webp');
    
CREATE TABLE jogo (
idJogo int primary key auto_increment,
nome varchar(45),
genero varchar(45)
);

INSERT INTO jogo (nome, genero) VALUES
	('Rat Lab', 'Puzzle'),
	('Connect 4', 'Casual'),
	('Snaking', 'Arcade'),
	('Slotknight', 'Roguelite');

CREATE TABLE conquista (
idConquista int primary key auto_increment,
nome varchar(45),
raridade varchar(45),
url varchar(45),
	constraint chkRaridade
	check (raridade in ('Comum', 'Rara', 'Lendária')),
descricao varchar(45)
);

INSERT INTO conquista (nome, raridade, url, descricao) VALUES
	('Lab Rat', 'Comum', '/assets/icon/labratBadge.webp', 'Desbravou o labirinto do rato em Rat Lab'),
	('Quadrático!', 'Comum', '/assets/icon/quadBadge.webp', 'Venceu a CPU no connect 4'),
	('Ssssagaz', 'Lendária',  '/assets/icon/snakingBadge.webp', 'Acabou com todas as frutas no Snaking'),
	('Jackpot!', 'Comum', '/assets/icon/jackpotBadge.webp', 'Sobreviveu todas as fases em Slotknight');

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50) unique,
	senha VARCHAR(50),
	fkAvatar int, 
    foreign key (fkAvatar) references avatar(idAvatar)
);

INSERT INTO usuario (nome, email, senha, fkAvatar) VALUES
('Alice', 'alice@email.com', '12345', 1),
('Bob', 'bob@email.com', '12345', 2),
('Carol', 'carol@email.com', '12345', 3);

CREATE TABLE partida (
fkUsuario int,
fkJogo int,
idPartida int,
	primary key (fkUsuario, fkJogo, idPartida),
score int,
dtPartida date,
result varchar(45),
	CONSTRAINT chkResult
		CHECK (result in ('Venceu','Perdeu')),
	foreign key (fkUsuario) references usuario(id),
    foreign key (fkJogo) references jogo(idJogo)
);

CREATE TABLE registroConquista (
	fkUsuario int,
    fkConquista int,
    primary key (fkUsuario, fkConquista),
	dtConquista date,
		foreign key (fkUsuario) references usuario(id),
        foreign key (fkConquista) references conquista(idConquista)
);

-- Partidas de Alice
INSERT INTO partida (fkUsuario, fkJogo, idPartida, score, dtPartida, result) VALUES
(1, 1, 1, 120, CURRENT_DATE() - INTERVAL 2 DAY, 'Venceu'),
(1, 2, 1, 80, CURRENT_DATE() - INTERVAL 1 DAY, 'Perdeu'),
(1, 3, 1, 150, CURRENT_DATE(), 'Venceu'),
(1, 4, 1, 90, CURRENT_DATE(), 'Venceu');

-- Partidas de Bob
INSERT INTO partida (fkUsuario, fkJogo, idPartida, score, dtPartida, result) VALUES
(2, 1, 1, 60, CURRENT_DATE() - INTERVAL 1 DAY, 'Venceu'),
(2, 2, 1, 110, CURRENT_DATE(), 'Venceu'),
(2, 3, 1, 130, CURRENT_DATE(), 'Perdeu');

-- Partidas de Carol
INSERT INTO partida (fkUsuario, fkJogo, idPartida, score, dtPartida, result) VALUES
(3, 2, 1, 90, CURRENT_DATE() - INTERVAL 2 DAY, 'Perdeu'),
(3, 3, 1, 140, CURRENT_DATE() - INTERVAL 1 DAY, 'Venceu'),
(3, 4, 1, 100, CURRENT_DATE(), 'Venceu');


INSERT INTO registroConquista (fkUsuario, fkConquista, dtConquista) VALUES
(1,1,CURRENT_DATE() - INTERVAL 3 DAY),
(1,2,CURRENT_DATE() - INTERVAL 1 DAY),
(1,4,CURRENT_DATE()),
(2,1,CURRENT_DATE() - INTERVAL 2 DAY),
(2,3,CURRENT_DATE() - INTERVAL 1 DAY),
(3,2,CURRENT_DATE() - INTERVAL 4 DAY),
(3,3,CURRENT_DATE() - INTERVAL 1 DAY),
(3,4,CURRENT_DATE());

select * from usuario;
select * from usuario join avatar on fkavatar = idavatar;

CREATE VIEW quant_partidas_vw AS -- View que soma as partidas para retornar qtd de partidas por jogo.
	select u.id, j.nome as jogo, j.idJogo, count(idPartida) as numPartidas from partida p 
		join usuario u on p.fkUsuario = u.id 
		join jogo j on p.fkJogo = j.idJogo 
			group by u.id, j.idJogo;

select idJogo, numPartidas from quant_partidas_vw where id = 3 and idJogo = 2; -- Select qnt partidas de um jogo e usuario.
select jogo, sum(numPartidas) as totalJogos from quant_partidas_vw where id = 4 group by idJogo; -- Select qnt de partidas de todos os jogos de um usuario.

CREATE VIEW score_dia_vw as -- View que soma os scores com base no dia.
	select u.id, j.idJogo, p.dtPartida, p.score
		from partida p 
        join usuario u on p.fkUsuario = u.id
        join jogo j on p.fkJogo = j.idJogo;
	
select dtPartida, sum(score) from score_dia_vw
	where id = 2 
    and dtPartida >= current_date() - interval 7 day
		group by dtPartida
        order by dtPartida; -- Soma das pontuações diarias nos ultimos 7 dias.

select dtPartida, sum(score) from score_dia_vw
	where id = 2
	and dtPartida = current_date()
		group by dtPartida; -- Soma das pontuações do dia de hoje.

CREATE VIEW sumScore_ontem_vw as -- View que soma os scores de dia - 1;
	select id, idJogo, sum(score) as total
		from score_dia_vw
		where dtPartida = current_date() - interval 1 day
			group by id, idJogo;

SELECT -- PORCENTAGEM DE EVOLUÇÃO ENTRE ONTEM E HOJE TODOS OS JOGOS
    (( (SELECT SUM(score) FROM score_dia_vw WHERE id = 2 AND dtPartida = CURRENT_DATE()) 
     - 
       (SELECT SUM(score) FROM score_dia_vw WHERE id = 2 AND dtPartida = CURRENT_DATE() - INTERVAL 1 DAY)
    ) / 
       (SELECT SUM(score) FROM score_dia_vw WHERE id = 2 AND dtPartida = CURRENT_DATE() - INTERVAL 1 DAY)
    ) * 100 AS porcentagem;

        
SELECT
    ((IFNULL(
        (SELECT SUM(score) FROM score_dia_vw WHERE id = 2 AND dtPartida = CURRENT_DATE() AND idJogo = 2),0)
      -
      IFNULL(
        (SELECT SUM(score) FROM score_dia_vw WHERE id = 2 AND dtPartida = CURRENT_DATE() - INTERVAL 1 DAY AND idJogo = 2),0)
    ) / IFNULL(
        (SELECT SUM(score) FROM score_dia_vw WHERE id = 2 AND dtPartida = CURRENT_DATE() - INTERVAL 1 DAY AND idJogo = 2),1)
    ) * 100 AS porcentagem;


SELECT c.idConquista, c.nome, c.raridade, c.descricao, c.url from conquista c  -- Select todas as conquistas de um usuario;
	join registroConquista r on fkConquista = idConquista
    join usuario u on fkUsuario = id
		where id = 2;

	