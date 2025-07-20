from bson import ObjectId
from datetime import datetime
from config import db

# Colecciones
libros_col = db["libros"]
prestamos_col = db["prestamos"]

def agregar_libro(libro):
    libro.setdefault("copias", 1)
    libro["disponibles"] = libro["copias"]
    libro["titulo"] = libro.pop("titulo", "").strip().lower()
    libro["autor"] = libro.pop("autor", "").strip().lower()
    libro["isbn"] = libro.pop("isbn", "").strip().lower()
    libro["genero"] = libro.pop("genero", "").strip().lower()
    libro["aniopublicacion"] = libro.pop("aniopublicacion", libro.pop("anioPublicacion", 0))
    # Validar si existe el ISBN
    if libros_col.find_one({"isbn": libro["isbn"]}):
        return "error: ya existe un libro con ese ISBN."
    
    return libros_col.insert_one(libro).inserted_id

def prestar_libro(isbn, usuario):
    libro = libros_col.find_one({"isbn": isbn.lower()})
    if not libro:
        return "libro no encontrado."
    if libro["disponibles"] < 1:
        return "no hay copias disponibles."
    prestamo = {
        "libroid": libro["_id"],
        "usuario": usuario.lower(),
        "fechaprestamo": datetime.now(),
        "fechadevolucion": None,
        "devuelto": False
    }
    prestamos_col.insert_one(prestamo)
    libros_col.update_one({"_id": libro["_id"]}, {"$inc": {"disponibles": -1}})
    return "prestamo registrado."

def devolver_libro(prestamo_id):
    prestamo = prestamos_col.find_one({"_id": ObjectId(prestamo_id)})
    if not prestamo or prestamo["devuelto"]:
        return "prestamo no encontrado o ya devuelto."
    prestamos_col.update_one({"_id": ObjectId(prestamo_id)}, {"$set": {"devuelto": True, "fechadevolucion": datetime.now()}})
    libros_col.update_one({"_id": prestamo["libroid"]}, {"$inc": {"disponibles": 1}})
    return "libro devuelto."

def buscar_libros(criterio):
    criterio = criterio.lower()
    consulta = {"$or": [
        {"titulo": {"$regex": criterio, "$options": "i"}},
        {"autor": {"$regex": criterio, "$options": "i"}},
        {"genero": {"$regex": criterio, "$options": "i"}}
    ]}
    return list(libros_col.find(consulta))

def reporte_populares():
    pipeline = [
        {"$match": {"devuelto": False}},
        {"$group": {"_id": "$libroid", "total": {"$sum": 1}}},
        {"$sort": {"total": -1}},
        {"$limit": 5},
        {"$lookup": {
            "from": "libros",
            "localField": "_id",
            "foreignField": "_id",
            "as": "libro"
        }},
        {"$unwind": "$libro"},
        {"$project": {
            "titulo": "$libro.titulo",
            "autor": "$libro.autor",
            "total": 1
        }}
    ]
    return list(db["prestamos"].aggregate(pipeline))

def obtener_libros():
    return list(libros_col.find())


def buscar_por_titulo(titulo):
    titulo = titulo.strip().lower()
    return list(libros_col.find({"titulo": titulo}))

def buscar_por_autor(autor):
    autor = autor.strip().lower()
    return list(libros_col.find({"autor": autor}))

def buscar_por_genero(genero):
    genero = genero.strip().lower()
    return list(libros_col.find({"genero": genero}))
