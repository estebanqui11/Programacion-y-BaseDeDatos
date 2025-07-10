// Creacion de nodos de departamentos
CREATE (it:Departamento {nombre:'IT'});
CREATE (rh:Departamento {nombre:'Recursos Humanos'});
CREATE (fin:Departamento {nombre:'Finanzas'});

// Creacion de nodos de empleados
CREATE (ana:Empleado {nombre:'Ana'});
CREATE (luis:Empleado {nombre:'Luis'});
CREATE (sofia:Empleado {nombre:'Sofía'});

// Creacion de nodos de proyectos
CREATE (pA:Proyecto {nombre:'Proyecto A'});
CREATE (pB:Proyecto {nombre:'Proyecto B'});

// Relaciones de pertenencia
CREATE (ana)-[:PERTENECE_A]->(it);
CREATE (luis)-[:PERTENECE_A]->(rh);
CREATE (sofia)-[:PERTENECE_A]->(fin);

// Relaciones de liderazgo
CREATE (ana)-[:LIDERA]->(pA);
CREATE (luis)-[:LIDERA]->(pB);

// Relaciones de asignación con horas
CREATE (ana)-[:ASIGNADO_A {horas:20}]->(pA);
CREATE (luis)-[:ASIGNADO_A {horas:10}]->(pA);
CREATE (sofia)-[:ASIGNADO_A {horas:15}]->(pB);
CREATE (ana)-[:ASIGNADO_A {horas:5}]->(pB);

// Consultas solicitadas
// 1. Nombre del proyecto, su líder y empleados asignados
MATCH (lider:Empleado)-[:LIDERA]->(p:Proyecto)<-[:ASIGNADO_A]-(e:Empleado)
RETURN p.nombre AS proyecto, lider.nombre AS lider, collect(e.nombre) AS empleados_asignados;

// 2. Total de horas semanales por proyecto
MATCH (e:Empleado)-[a:ASIGNADO_A]->(p:Proyecto)
RETURN p.nombre AS proyecto, SUM(a.horas) AS total_horas;

// 3. Empleados que trabajan en más de un proyecto
MATCH (e:Empleado)-[:ASIGNADO_A]->(p:Proyecto)
WITH e, COUNT(DISTINCT p) AS proyectos
WHERE proyectos > 1
RETURN e.nombre; 