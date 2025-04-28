// Práctico MongoDB - CRUD y más

// Ejercicio 1: CRUD básico
use empresa;

db.empleados.insertMany([
    { nombre: "Luciana Pérez", edad: 28, puesto: "analista" },
    { nombre: "Roberto Gimenez", edad: 22, puesto: "pasante" },
    { nombre: "María López Muñoz", edad: 35, puesto: "desarrollador" }
]);

db.empleados.updateOne(
    { nombre: "Luciana Pérez" },
    { $set: { edad: 29 } }
);

db.empleados.deleteOne(
    { puesto: "pasante" }
);

// Ejercicio 2: Búsquedas con operadores
db.empleados.find(
    { edad: { $gte: 25, $lte: 40 } }
);

// Ejercicio 3: Uso de proyección
db.empleados.find(
    {},
    { nombre: 1, puesto: 1, _id: 0 }
);

// Ejercicio 4: Documentos embebidos
db.empleados.updateMany(
    {},
    { $set: { direccion: { calle: "", ciudad: "", codigo_postal: "" } } }
);

// Ejercicio 5: Agregación
use empresa;

db.ventas.insertMany([
    { producto: "Notebook", cantidad: 2, precio_unitario: 1000 },
    { producto: "Mouse", cantidad: 5, precio_unitario: 20 },
    { producto: "Notebook", cantidad: 1, precio_unitario: 1000 }
]);

db.ventas.aggregate([
    {
        $group: {
            _id: "$producto",
            total_vendido: { $sum: "$cantidad" }
        }
    }
]);

// Ejercicio 6: Índices
use empresa;

db.clientes.insertMany([
    { apellido: "García", nombre: "Juan" },
    { apellido: "Fernández", nombre: "Maria Ines" }
]);

db.clientes.createIndex(
    { apellido: 1, nombre: 1 }
);

// Ejercicio 7: Referencias
use empresa;

db.cursos.insertMany([
    { _id: 1, nombre: "Matemáticas" },
    { _id: 2, nombre: "Programación" }
]);

db.alumnos.insertMany([
    { nombre: "Carlos", id_curso: [1, 2] },
    { nombre: "Maria Ines", id_curso: [2] }
]);

// Ejercicio 8: Uso de $lookup
db.alumnos.aggregate([
    {
        $lookup: {
            from: "cursos",
            localField: "id_curso",
            foreignField: "_id",
            as: "cursos_inscriptos"
        }
    }
]);

// Ejercicio 9: Replicación y sharding (teórico)
// Replica Set: Sirve para tener varias copias de la base de datos en diferentes servidores.
// Si uno se cae, otro sigue funcionando.
// Sharding: Se usa para repartir los datos en varios servidores y hacer que todo funcione más rápido si hay muchos datos.

// Ejercicio 10: Seguridad y backups
// Crear un usuario que pueda leer y escribir en la base de datos.
// Backup: se usa para guardar una copia de la base de datos.
// Restaurar: se usa para volver a poner la base de datos usando el backup.

use admin;

db.createUser({
    user: "usuario_rw",
    pwd: "contraseña011",
    roles: [
        { role: "readWrite", db: "empresa" }
    ]
});

// Backup:
// mongodump --db empresa --out /ruta/del/backup/

// Restauración:
// mongorestore --db empresa /ruta/del/backup/empresa/
