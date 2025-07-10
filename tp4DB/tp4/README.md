sistema de gestion de proyectos

este trabajo es un ejemplo simple de como guardar datos de empleados, departamentos y proyectos

- cada empleado esta en un departamento
- los proyectos pueden tener varios empleados y se les pone cuantas horas trabajan
- un empleado puede ser lider de uno o mas proyectos

archivos:
- modelo_relacional.sql: para usar en mysql o postgres, crea las tablas, mete datos y tiene consultas
- modelo_grafos.cypher: para usar en neo4j, crea los nodos, relaciones y consultas

como usar:
- si usas mysql o postgres, copia el modelo_relacional.sql y pegalo en tu base de datos
- si usas neo4j, copia el modelo_grafos.cypher y pegalo en neo4j browser

las consultas al final de cada archivo te muestran:
- el nombre del proyecto, quien es el lider y los empleados que trabajan ahi
- cuantas horas totales se trabajan en cada proyecto
- que empleados trabajan en mas de un proyecto
