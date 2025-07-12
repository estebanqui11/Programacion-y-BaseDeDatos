
// TP2 MongoDB
// Lautaro Gimenez

// 1: CRUD basico
use empresa;
db.empleados.insertMany([
  { nombre: "Ana Perez", edad: 30, puesto: "analista" },
  { nombre: "Luis Gomez", edad: 22, puesto: "pasante" },
  { nombre: "Maria Ruiz", edad: 40, puesto: "gerente" }
]);
db.empleados.updateOne({ nombre: "Ana Perez" }, { $set: { edad: 31 } });
db.empleados.deleteOne({ puesto: "pasante" });

// 2: Busqueda edad 25-40
db.empleados.find({ edad: { $gte: 25, $lte: 40 } });

// 3: Proyeccion nombre y puesto
db.empleados.find({}, { nombre: 1, puesto: 1, _id: 0 });

// 4: Agregar direccion
db.empleados.updateMany({}, { $set: {
  direccion: { calle: "Av. Alem 1220", ciudad: "Bahia Blanca", codigo_postal: "8000" }
}});

// 5: Total ventas por producto
db.ventas.insertMany([
  { producto: "Camisa", cantidad: 5, precio_unitario: 20 },
  { producto: "Pantalon", cantidad: 3, precio_unitario: 40 },
  { producto: "Remera", cantidad: 2, precio_unitario: 20 }
]);
db.ventas.aggregate([
  { $group: { _id: "$producto", total: { $sum: { $multiply: ["$cantidad", "$precio_unitario"] } } } }
]);

// 6: Indice compuesto clientes
db.clientes.createIndex({ apellido: 1, nombre: 1 });

// 7: Referencias cursos y alumnos
const id1 = ObjectId();
const id2 = ObjectId();
db.cursos.insertMany([
  { _id: id1, nombre: "MongoDB Basico" },
  { _id: id2, nombre: "SQL Avanzado" }
]);
db.alumnos.insertMany([
  { nombre: "Tomas", id_cursos: [id1] },
  { nombre: "Lucia", id_cursos: [id1, id2] }
]);

// 8: Lookup alumnos-cursos
db.alumnos.aggregate([
  { $lookup: { from: "cursos", localField: "id_cursos", foreignField: "_id", as: "cursos_det" } }
]);

// 9: Teoria
// Replicacion: crea copias identicas de los datos en varios servidos para que si uno falla el sistema continue funcionando
// Sharding: reparte los datos en varios servidores para que todos trabajen procesando la informacion asi procesan menos y es todo mas rapido.

// 10: Seguridad y backup
use empresa;
db.createUser({ user: "anaUser", pwd: "secret123", roles: [{ role: "readWrite", db: "empresa" }] });
// mongodump --db empresa --out ./backup_empresa
// mongorestore --db empresa --backup_empresa/empresa
