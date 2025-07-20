from biblioteca import agregar_libro, prestar_libro, devolver_libro, buscar_por_titulo, buscar_por_autor, buscar_por_genero, reporte_populares

from pprint import pprint


def menu():
    while True:
        print("\n--- sistema de biblioteca digital ---")
        print("1. agregar libro")
        print("2. prestar libro")
        print("3. devolver libro")
        print("4. buscar libros")
        print("5. reporte de libros mas prestados")
        print("6. salir")
        opcion = input("seleccione una opcion: ")

        if opcion == "1":
            libro = {}
            libro["titulo"] = input("titulo: ").strip().lower()
            libro["autor"] = input("autor: ").strip().lower()
            libro["isbn"] = input("isbn: ").strip().lower()
            libro["genero"] = input("genero: ").strip().lower()
            libro["aniopublicacion"] = int(input("anio de publicacion: "))
            libro["copias"] = int(input("cantidad de copias: "))
            id_libro = agregar_libro(libro)
            print(f"libro agregado con id: {id_libro}")

        elif opcion == "2":
            isbn = input("isbn del libro a prestar: ").lower()
            usuario = input("nombre del usuario: ").lower()
            resultado = prestar_libro(isbn, usuario)
            print(resultado)

        elif opcion == "3":
            prestamo_id = input("id del prestamo a devolver: ")
            resultado = devolver_libro(prestamo_id)
            print(resultado)

        elif opcion == "4":
            print("buscar por:")
            print("1. titulo")
            print("2. autor")
            print("3. genero")
            filtro = input("elige una opcion: ")

            criterio = input("ingresa el texto de búsqueda: ").strip()
            if filtro == "1":
                resultados = buscar_por_titulo(criterio)
            elif filtro == "2":
                resultados = buscar_por_autor(criterio)
            elif filtro == "3":
                resultados = buscar_por_genero(criterio)
            else:
                print("opcion no valida.")
                resultados = []

            if resultados:
                for libro in resultados:
                    pprint(libro)
            else:
                print("no se encontraron libros.")

        elif opcion == "5":
            reporte = reporte_populares()
            if not reporte:
                print("No hay préstamos registrados.")
            else:
                print("\nTop 5 libros mas prestados:\n")
            for i, r in enumerate(reporte, 1):
                    titulo = r["titulo"].capitalize()
                    autor = r["autor"].capitalize()
                    total = r["total"]
                    print(f"{i}. {titulo} (Autor: {autor}) - Prestamos: {total}")

        elif opcion == "6":
            print("Gracias por visitarnos.")
            break
        else:
            print("opcion no valida, intente de nuevo.")

if __name__ == "__main__":
    menu() 