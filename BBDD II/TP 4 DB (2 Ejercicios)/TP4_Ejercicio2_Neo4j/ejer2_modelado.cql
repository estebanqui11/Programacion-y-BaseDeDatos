// Borrado previo
MATCH (n) DETACH DELETE n;

// Crear carreras
CREATE (c1:Carrera {nombre: "Programacion"}),
       (c2:Carrera {nombre: "Tecnologia"}),
       (c3:Carrera {nombre: "Arquitectura"}),
       (c4:Carrera {nombre: "Ingenieria"});

// Crear estudiantes
CREATE (e1:Estudiante {nombre: "Juan"}),
       (e2:Estudiante {nombre: "Gero"}),
       (e3:Estudiante {nombre: "Esteban"}),
       (e4:Estudiante {nombre: "Lautaro"});

// Relacionar estudiantes a carreras
MATCH (e1:Estudiante {nombre: "Juan"}), (c1:Carrera {nombre: "Programacion"})
CREATE (e1)-[:PERTENECE_A]->(c1);
MATCH (e2:Estudiante {nombre: "Gero"}), (c2:Carrera {nombre: "Tecnologia"})
CREATE (e2)-[:PERTENECE_A]->(c2);
MATCH (e3:Estudiante {nombre: "Esteban"}), (c3:Carrera {nombre: "Arquitectura"})
CREATE (e3)-[:PERTENECE_A]->(c3);
MATCH (e4:Estudiante {nombre: "Lautaro"}), (c4:Carrera {nombre: "Ingenieria"})
CREATE (e4)-[:PERTENECE_A]->(c4);

// Crear categorias de libros
CREATE (cat1:Categoría {nombre: "Programación"}),
       (cat2:Categoría {nombre: "Tecnología"}),
       (cat3:Categoría {nombre: "Arquitectura"}),
       (cat4:Categoría {nombre: "Ingeniería"});

// Crear libros
CREATE (l1:Libro {titulo: "Python para Todos"}),
       (l2:Libro {titulo: "Introducción a la Tecnología"}),
       (l3:Libro {titulo: "Manual de Arquitectura"}),
       (l4:Libro {titulo: "Fundamentos de Ingeniería"});

// Relacionar libros a categorias
MATCH (l1:Libro {titulo: "Python para Todos"}), (cat1:Categoría {nombre: "Programación"})
CREATE (l1)-[:ES_DE]->(cat1);
MATCH (l2:Libro {titulo: "Introducción a la Tecnología"}), (cat2:Categoría {nombre: "Tecnología"})
CREATE (l2)-[:ES_DE]->(cat2);
MATCH (l3:Libro {titulo: "Manual de Arquitectura"}), (cat3:Categoría {nombre: "Arquitectura"})
CREATE (l3)-[:ES_DE]->(cat3);
MATCH (l4:Libro {titulo: "Fundamentos de Ingeniería"}), (cat4:Categoría {nombre: "Ingeniería"})
CREATE (l4)-[:ES_DE]->(cat4);

// Crear prestamos (con fecha y estado)
MATCH (e1:Estudiante {nombre: "Juan"}), (l1:Libro {titulo: "Python para Todos"})
CREATE (e1)-[:PRESTO {fecha: "2025-07-10", estado: "Devuelto"}]->(l1);
MATCH (e2:Estudiante {nombre: "Gero"}), (l2:Libro {titulo: "Introducción a la Tecnología"})
CREATE (e2)-[:PRESTO {fecha: "2025-07-11", estado: "Activo"}]->(l2);
MATCH (e3:Estudiante {nombre: "Esteban"}), (l3:Libro {titulo: "Manual de Arquitectura"})
CREATE (e3)-[:PRESTO {fecha: "2025-07-12", estado: "Activo"}]->(l3);
MATCH (e4:Estudiante {nombre: "Lautaro"}), (l4:Libro {titulo: "Fundamentos de Ingeniería"})
CREATE (e4)-[:PRESTO {fecha: "2025-07-13", estado: "Activo"}]->(l4);
MATCH (e1:Estudiante {nombre: "Juan"}), (l2:Libro {titulo: "Introducción a la Tecnología"})
CREATE (e1)-[:PRESTO {fecha: "2025-07-14", estado: "Devuelto"}]->(l2);
