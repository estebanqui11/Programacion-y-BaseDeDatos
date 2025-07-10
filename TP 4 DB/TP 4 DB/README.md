# sistema de gestion de proyectos

este proyecto contiene el archivo modelo_grafos.cypher con el modelo de grafos y ejemplos de datos para un sistema de gestion de proyectos.

## contenido del archivo modelo_grafos.cypher
- crea nodos de empleados, departamentos y proyectos
- asigna empleados a departamentos
- asigna empleados a proyectos con horas semanales
- define lideres de proyecto
- incluye consultas cypher para:
  - obtener el nombre del proyecto, su lider y los empleados asignados
  - calcular el total de horas semanales por proyecto
  - listar los empleados que trabajan en mas de un proyecto

## uso
importa el archivo modelo_grafos.cypher en tu base de datos neo4j para crear los nodos, relaciones y ejecutar las consultas de ejemplo. 