from flask import Flask, render_template, request, redirect
from biblioteca import agregar_libro, prestar_libro, devolver_libro, buscar_libros, obtener_libros
from bson.objectid import ObjectId
from config import db
from datetime import datetime


libros = db["libros"]
tabla_prestamos = db["prestamos"]

app = Flask(__name__, template_folder='vistas', static_folder='recursos')

@app.route("/")
def inicio():
    filtro = request.args.get("filtro", "").strip().lower()
    autor = request.args.get("autor", "").strip().lower()
    genero = request.args.get("genero", "").strip().lower()

    consulta = {}
    if filtro:
        consulta["titulo"] = {"$regex": filtro, "$options": "i"}
    if autor:
        consulta["autor"] = {"$regex": autor, "$options": "i"}
    if genero:
        consulta["genero"] = genero
        
    libros_disponibles = list(libros.find(consulta)) if consulta else list(libros.find())

    return render_template("index.html", libros=libros_disponibles)


@app.route("/agregar", methods=["GET", "POST"])
def agregar():
    if request.method == "POST":
        libro = {
            "titulo": request.form["titulo"],
            "autor": request.form["autor"],
            "isbn": request.form["isbn"],
            "genero": request.form["genero"],
            "aniopublicacion": int(request.form["aniopublicacion"][:4]),
            "copias": int(request.form["copias"])
        }
        agregar_libro(libro)
        return redirect("/")
    return render_template("agregar.html")


@app.route("/prestar", methods=["GET", "POST"])
def prestar():
    mensaje = ""
    if request.method == "POST":
        isbn = request.form["isbn"]
        usuario = request.form["usuario"]
        cantidad = int(request.form["cantidad"])

        libro = libros.find_one({"isbn": isbn.lower()})

        if not libro:
            mensaje = "El libro no fue encontrado."
        elif libro["disponibles"] < cantidad:
            mensaje = f"Solo hay {libro['disponibles']} copias disponibles."
        else:
            for _ in range(cantidad):
                tabla_prestamos.insert_one({
                    "libroid": libro["_id"],
                    "usuario": usuario.lower(),
                    "fechaprestamo": datetime.now(),
                    "fechadevolucion": None,
                    "devuelto": False
                })
            libros.update_one({"_id": libro["_id"]}, {"$inc": {"disponibles": -cantidad}})
            mensaje = f"Se registró el préstamo de {cantidad} copia(s) para {usuario}."

    return render_template("prestar.html", mensaje=mensaje)


@app.route("/devolver", methods=["GET"])
def mostrar_formulario_devolver():
    return render_template("devolver.html")



@app.route("/devolver-libro", methods=["POST"])
def devolver_libro():
    usuario = request.form["usuario"].strip().lower()
    isbn = request.form["isbn"].strip().lower()
    cantidad = int(request.form["cantidad_devuelta"])

    libro = libros.find_one({"isbn": isbn})
    if not libro:
        return "Libro no encontrado", 404

    prestamos = tabla_prestamos.find({
        "usuario": usuario,
        "libroid": libro["_id"],
        "devuelto": False
    }).limit(cantidad)

    devueltos = 0
    for p in prestamos:
        tabla_prestamos.update_one(
            {"_id": p["_id"]},
            {"$set": {"devuelto": True, "fechadevolucion": datetime.now()}}
        )
        devueltos += 1

    if devueltos > 0:
        libros.update_one({"_id": libro["_id"]}, {"$inc": {"disponibles": devueltos}})

    return redirect("/prestamos-activos")

@app.route("/buscar", methods=["GET", "POST"])
def buscar():
    resultados = []
    if request.method == "POST":
        criterio = request.form["criterio"]
        resultados = buscar_libros(criterio)
    return render_template("buscar.html", resultados=resultados)


@app.route("/eliminar/<id>", methods=["POST"])
def eliminar_libro(id):
    libros.delete_one({"_id": ObjectId(id)})
    return redirect("/")

@app.route("/prestamos-activos")
def prestamos_activos():
    pipeline = [
        {"$match": {"devuelto": False}},
        {"$group": {
            "_id": {
                "libroid": "$libroid",
                "usuario": "$usuario"
            },
            "cantidad": {"$sum": 1},
            "fecha": {"$min": "$fechaprestamo"}
        }},
        {"$lookup": {
            "from": "libros",
            "localField": "_id.libroid",
            "foreignField": "_id",
            "as": "libro"
        }},
        {"$unwind": "$libro"},
        {"$project": {
            "usuario": "$_id.usuario",
            "titulo": "$libro.titulo",
            "fecha": {"$dateToString": {"format": "%Y-%m-%d", "date": "$fecha"}},
            "cantidad": 1
        }}
    ]
    agrupados = list(tabla_prestamos.aggregate(pipeline))
    return render_template("prestamos.html", prestamos=agrupados)


if __name__ == "__main__":
    app.run(debug=True)
