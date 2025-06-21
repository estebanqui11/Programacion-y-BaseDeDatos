1. Si tengo una tabla de estudiantes y otra de cursos, donde los estudiantes estan incriptos a un curso, podría generar un problema si intento eliminar un estudiante que ya está inscripto en uno o más cursos. Eso generaría una violación a la integridad referencial.
Esto lo podemos solucionar agregando ON DELETE RESTRICT que no nos dejaria eliminar el estudiante si tiene inscripciones activas en la tabla cursos.

<img src="img/CrearTablas.png" alt="TablasBD" width="600" />
<img src="img/codigoErrorEliminarEstudiante.png" alt="Codigo Error" width="900" />

***

2. Creamos una tabla llamada matriculas, que tiene una clave foránea hacia la tabla estudiantes. Esta restricción sirve para garantizar que solo se puedan registrar inscripciones de estudiantes que realmente existen en la base de datos.

<img src="img/errorclaveforanea.png" alt="Codigo Error" width="900" />

3. En este ejercicio simulamos que dos usuarios intentan modificar al mismo tiempo el saldo de una cuenta. Para evitar errores en los datos usamos el nivel de aislamiento `SERIALIZABLE`, el cual debería evitar que las dos transacciones trabajen sobre el mismo dato al mismo tiempo. Pero para que funcione bien, se necesita usar SELECT saldo FROM cuentas WHERE id = 1 FOR UPDATE para que el registro quede bloqueado y así evitar que otra transacción lo lea o lo modifique hasta que se haga el COMMIT.

<table>
  <tr>
    <td><img src="img/readcommitted1.png" alt="ReadCommitted1" width="600"/></td>
    <td><img src="img/readcommitted2.png" alt="ReadCommitted2" width="600"/></td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="img/serializable1.png" alt="TablasBD" width="600" /></td>
    <td><img src="img/serializable2.png" alt="TablasBD" width="600" /></td>
  </tr>
</table>


