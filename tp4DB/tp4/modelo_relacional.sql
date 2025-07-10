-- Creación de tablas
CREATE TABLE Departamento (
    id INT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE Empleado (
    id INT PRIMARY KEY,
    nombre VARCHAR(50),
    id_departamento INT,
    FOREIGN KEY (id_departamento) REFERENCES Departamento(id)
);

CREATE TABLE Proyecto (
    id INT PRIMARY KEY,
    nombre VARCHAR(50),
    id_lider INT,
    FOREIGN KEY (id_lider) REFERENCES Empleado(id)
);

CREATE TABLE Asignacion (
    id_empleado INT,
    id_proyecto INT,
    horas_semanales INT,
    PRIMARY KEY (id_empleado, id_proyecto),
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id),
    FOREIGN KEY (id_proyecto) REFERENCES Proyecto(id)
);

-- Inserción de datos de ejemplo
INSERT INTO Departamento VALUES (1, 'IT');
INSERT INTO Departamento VALUES (2, 'Recursos Humanos');
INSERT INTO Departamento VALUES (3, 'Finanzas');

INSERT INTO Empleado VALUES (1, 'Ana', 1);
INSERT INTO Empleado VALUES (2, 'Luis', 2);
INSERT INTO Empleado VALUES (3, 'Sofía', 3);

INSERT INTO Proyecto VALUES (1, 'Proyecto A', 1); -- Ana es lider
INSERT INTO Proyecto VALUES (2, 'Proyecto B', 2); -- Luis es lider

INSERT INTO Asignacion VALUES (1, 1, 20); -- Ana en Proyecto A, 20hs
INSERT INTO Asignacion VALUES (2, 1, 10); -- Luis en Proyecto A, 10hs
INSERT INTO Asignacion VALUES (3, 2, 15); -- Sofíi en Proyecto B, 15hs
INSERT INTO Asignacion VALUES (1, 2, 5);  -- Ana en Proyecto B, 5hs

-- Consultas solicitadas
-- 1. Nombre del proyecto, su lider y los empleados asignados
SELECT 
  p.nombre AS proyecto,
  e_lider.nombre AS lider,
  e.nombre AS empleado_asignado
FROM Proyecto p
JOIN Empleado e_lider ON p.id_lider = e_lider.id
JOIN Asignacion a ON p.id = a.id_proyecto
JOIN Empleado e ON a.id_empleado = e.id;

-- 2. Total de horas semanales por proyecto
SELECT 
  p.nombre AS proyecto,
  SUM(a.horas_semanales) AS total_horas
FROM Proyecto p
JOIN Asignacion a ON p.id = a.id_proyecto
GROUP BY p.id, p.nombre;

-- 3. Empleados que trabajan en mas de un proyecto
SELECT 
  e.nombre
FROM Empleado e
JOIN Asignacion a ON e.id = a.id_empleado
GROUP BY e.id, e.nombre
HAVING COUNT(DISTINCT a.id_proyecto) > 1; 