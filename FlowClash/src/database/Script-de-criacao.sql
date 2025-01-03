
CREATE DATABASE FlowClash;


USE FlowClash;


CREATE TABLE cadastro(
    id_usuario INT PRIMARY KEY auto_increment,
    nome VARCHAR(45),
    usuario VARCHAR(45) UNIQUE, 
    email VARCHAR(45) UNIQUE, 
    senha VARCHAR(45)
);


select * from cadastro;


CREATE TABLE dados_quiz(
    id_dado_quiz INT PRIMARY KEY auto_increment, 
    qtd_total INT,
    qtd_corretas INT, 
    fk_usuario INT, 
    CONSTRAINT fk_usuario_dado_quiz FOREIGN KEY (fk_usuario) REFERENCES cadastro(id_usuario) 
);


select * from dados_quiz;


SELECT 
    (dq.qtd_total - dq.qtd_corretas) AS qtd_erradas,
    dq.qtd_corretas, 
    d.nome 
FROM dados_quiz AS dq 
JOIN cadastro AS d 
ON dq.fk_usuario = d.id_usuario
WHERE d.id_usuario = 1
ORDER BY dq.id_dado_quiz DESC LIMIT 1; 


SELECT 
    max(dq.qtd_corretas) AS max_correstas, 
    min(dq.qtd_corretas) AS min_corretas, 
    TRUNCATE(avg(dq.qtd_corretas), 1) AS media_corretas 
FROM dados_quiz AS dq 
JOIN cadastro AS d 
ON dq.fk_usuario = d.id_usuario
WHERE dq.fk_usuario = 7 ; 


SELECT COUNT(*)
FROM dados_quiz 
WHERE fk_usuario = 1  
GROUP BY fk_usuario;





SELECT *
FROM dados_quiz 
ORDER BY id_dado_quiz DESC 
LIMIT 1; 
