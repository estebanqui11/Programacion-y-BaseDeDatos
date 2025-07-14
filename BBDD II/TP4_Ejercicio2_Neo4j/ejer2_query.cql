// 1. Obtener todos los libros actualmente prestados (estado "Activo")
MATCH (e:Estudiante)-[p:PRESTO {estado: "Activo"}]->(l:Libro)
RETURN l.titulo AS Libro, e.nombre AS PrestadoA, p.fecha AS Fecha;

// 2. Listar cuántos libros ha pedido prestado cada estudiante
MATCH (e:Estudiante)-[p:PRESTO]->(l:Libro)
RETURN e.nombre AS Estudiante, COUNT(p) AS CantidadPrestamos;

// 3. Mostrar las categorías con más préstamos activos
MATCH (e:Estudiante)-[p:PRESTO {estado: "Activo"}]->(l:Libro)-[:ES_DE]->(cat:Categoría)
RETURN cat.nombre AS Categoria, COUNT(p) AS PrestamosActivos
ORDER BY PrestamosActivos DESC;

// 4. Encontrar los estudiantes que no tienen préstamos activos
MATCH (e:Estudiante)
WHERE NOT (e)-[:PRESTO {estado: "Activo"}]->(:Libro)
RETURN e.nombre AS Estudiante;
