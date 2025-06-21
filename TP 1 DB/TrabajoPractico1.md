1. Si tengo una tabla de estudiantes y otra de cursos, donde los estudiantes estan incriptos a un curso, podría generar un problema si intento eliminar un estudiante que ya está inscripto en uno o más cursos. Eso generaría una violación a la integridad referencial.
Esto lo podemos solucionar agregando ON DELETE RESTRICT que no nos dejaria eliminar el estudiante si tiene inscripciones activas en la tabla cursos.

<img src="img/CrearTablas.png" alt="TablasBD" width="600" />
<img src="img/codigoErrorEliminarEstudiante.png" alt="Codigo Error" width="900" />

***

2. Creamos una tabla llamada matriculas, que tiene una clave foránea hacia la tabla estudiantes. Esta restricción sirve para garantizar que solo se puedan registrar inscripciones de estudiantes que realmente existen en la base de datos.

<img src="img/errorclaveforanea.png" alt="Codigo Error" width="900" />

***

3. En este ejercicio simulamos que dos usuarios intentan modificar al mismo tiempo el saldo de una cuenta. Para evitar errores en los datos usamos el nivel de aislamiento SERIALIZABLE, el cual debería evitar que las dos transacciones trabajen sobre el mismo dato al mismo tiempo. Pero para que funcione bien, se necesita usar SELECT saldo FROM cuentas WHERE id = 1 FOR UPDATE para que el registro quede bloqueado y así evitar que otra transacción lo lea o lo modifique hasta que se haga el COMMIT.

<table>
  <tr>
    <td><img src="img/readcommitted1.png" alt="ReadCommitted1" width="600" height="300"/></td>
    <td><img src="img/readcommitted2.png" alt="ReadCommitted2" width="600" height="300"/></td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="img/serializable1.png" alt="Serializable1" width="600" height="300"/></td>
    <td><img src="img/serializable2.png" alt="Serializable2" width="600" height="300"/></td>
  </tr>
</table>

***

4. Creamos la tabla con productos:

<td><img src="img/creartable.png" alt="CrearTabla" width="600" height="300"/></td>

Luego creamos un procedimiento para que se inserten  100.000 registros:

<td><img src="img/procedure.png" alt="Procedure" width="600" height="300"/></td>

Creamos un indice en la columna nombre:

<td><img src="img/indice.png" alt="Indice" width="600" height="300"/></td>

Ejecutamos de nuevo la consulta para ver el tiempo de respuesta:

<td><img src="img/explain.png" alt="Explain" width="600" height="300"/></td>

***

5. Creamos una consulta que filtra por múltiples columnas: categoria, stock y precio. Primero se ejecutó sin ningún índice, luego con diferentes índices (simples y compuestos), y se compararon usando EXPLAIN.

<td><img src="img/sinexplain.png" alt="Sin explain" width="800" height="300"/></td>

<td><img src="img/indice1.png" alt="Indice 1" width="800" height="200"/></td>

<td><img src="img/indice2.png" alt="Indice 2" width="800" height="200"/></td>

<td><img src="img/indice3.png" alt="Indice3" width="800" height="200"/></td>

<td><img src="img/conexplain.png" alt="Con explain" width="800" height="300"/></td>

***

6. Primero creamos la tabla ventas, luego la vista resumen_mensuales que agrupa las ventas por producto, mes y año. Luego mostramos los 5 productos más vendidos:

<td><img src="img/creartabla_ventas.png" alt="Crear tabla ventas" width="600"/></td>

<td><img src="img/vista_ventas.png" alt="Vista ventas" width="600" height="300"/></td>

<td><img src="img/muestra5productos.png" alt="Muestra productos" width="600" height="300"/></td>

***

7. Primero creamos un nuevo usuario:

<td><img src="img/crearnuevouser.png" alt="Crear nuevo usuario" width="600" /></td>

Luego le damos permisos de lectura:

<td><img src="img/permisosololectura.png" alt="Permiso solo lectura" width="800" height="300"/></td>

Finalmente, probamos el acceso para ver los productos:

<td><img src="img/mostrarlosproductosdelusuario.png" alt="Muestra de los productos" width="800" height="300"/></td>

Por ultimo muestra error a la hora de insertar un producto:

<td><img src="img/errorinsertarproductos.png" alt="Vista ventas" width="800" height="300"/></td>

***