// este archivo crea el modelo de grafos para un sistema de gestion de proyectos
// cada empleado pertenece a un departamento
// los proyectos pueden tener varios empleados asignados con horas semanales
// un empleado puede liderar uno o varios proyectos
// nodos de departamentos
CREATE (:departamento {nombre: 'sistemas'});
CREATE (:departamento {nombre: 'recursos humanos'});
CREATE (:departamento {nombre: 'finanzas'});

// nodos de empleados
CREATE (:empleado {nombre: 'juan', apellido: 'perez'});
CREATE (:empleado {nombre: 'maria', apellido: 'gomez'});
CREATE (:empleado {nombre: 'lucas', apellido: 'rodriguez'});

// relacion empleado-departamento
MATCH (e:empleado {nombre: 'juan'}), (d:departamento {nombre: 'sistemas'})
CREATE (e)-[:trabaja_en]->(d);
MATCH (e:empleado {nombre: 'maria'}), (d:departamento {nombre: 'recursos humanos'})
CREATE (e)-[:trabaja_en]->(d);
MATCH (e:empleado {nombre: 'lucas'}), (d:departamento {nombre: 'finanzas'})
CREATE (e)-[:trabaja_en]->(d);

// nodos de proyectos
CREATE (:proyecto {nombre: 'sistema web'});
CREATE (:proyecto {nombre: 'plan de capacitacion'});

// asignaciones de empleados a proyectos con horas semanales
MATCH (e:empleado {nombre: 'juan'}), (p:proyecto {nombre: 'sistema web'})
CREATE (e)-[:asignado {horas: 20}]->(p);
MATCH (e:empleado {nombre: 'maria'}), (p:proyecto {nombre: 'sistema web'})
CREATE (e)-[:asignado {horas: 10}]->(p);
MATCH (e:empleado {nombre: 'maria'}), (p:proyecto {nombre: 'plan de capacitacion'})
CREATE (e)-[:asignado {horas: 15}]->(p);
MATCH (e:empleado {nombre: 'lucas'}), (p:proyecto {nombre: 'plan de capacitacion'})
CREATE (e)-[:asignado {horas: 25}]->(p);

// lideres de proyecto
MATCH (e:empleado {nombre: 'juan'}), (p:proyecto {nombre: 'sistema web'})
CREATE (e)-[:lidera]->(p);
MATCH (e:empleado {nombre: 'maria'}), (p:proyecto {nombre: 'plan de capacitacion'})
CREATE (e)-[:lidera]->(p); 

// consultas cypher
// obtener el nombre del proyecto, su lider y los empleados asignados
MATCH (l:empleado)-[:lidera]->(p:proyecto)
OPTIONAL MATCH (e:empleado)-[a:asignado]->(p)
RETURN p.nombre as proyecto, l.nombre + ' ' + l.apellido as lider, collect(e.nombre + ' ' + e.apellido) as empleados_asignados;

// calcular el total de horas semanales por proyecto
MATCH (e:empleado)-[a:asignado]->(p:proyecto)
RETURN p.nombre as proyecto, sum(a.horas) as total_horas_semanales;

// listar los empleados que trabajan en mas de un proyecto
MATCH (e:empleado)-[:asignado]->(p:proyecto)
WITH e, count(p) as cantidad_proyectos
WHERE cantidad_proyectos > 1
RETURN e.nombre + ' ' + e.apellido as empleado, cantidad_proyectos; 