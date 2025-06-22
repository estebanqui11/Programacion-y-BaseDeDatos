-- Crea la tabla Clientes
CREATE TABLE Clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100)
);

-- Crea la tabla de auditoría
CREATE TABLE Auditoria_Clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    accion VARCHAR(10),
    fecha DATETIME,
    usuario VARCHAR(100)
);

-- Trigger para INSERT
DELIMITER $$
CREATE TRIGGER auditar_insert_clientes
AFTER INSERT ON Clientes
FOR EACH ROW
BEGIN
    INSERT INTO Auditoria_Clientes (id_cliente, accion, fecha, usuario)
    VALUES (NEW.id, 'INSERT', NOW(), USER());
END $$
DELIMITER ;

-- Trigger para UPDATE
DELIMITER $$
CREATE TRIGGER auditar_update_clientes
AFTER UPDATE ON Clientes
FOR EACH ROW
BEGIN
    INSERT INTO Auditoria_Clientes (id_cliente, accion, fecha, usuario)
    VALUES (OLD.id, 'UPDATE', NOW(), USER());
END $$
DELIMITER ;

-- Trigger para DELETE
DELIMITER $$
CREATE TRIGGER auditar_delete_clientes
AFTER DELETE ON Clientes
FOR EACH ROW
BEGIN
    INSERT INTO Auditoria_Clientes (id_cliente, accion, fecha, usuario)
    VALUES (OLD.id, 'DELETE', NOW(), USER());
END $$
DELIMITER ;

SELECT * FROM Clientes;

DROP TABLE Clientes; 