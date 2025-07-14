from biblioteca import agregar_libro, prestar_libro, devolver_libro, buscar_libros, reporte_populares
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
            libro["titulo"] = input("titulo: ").lower()
            libro["autor"] = input("autor: ").lower()
            libro["isbn"] = input("isbn: ").lower()
            libro["genero"] = input("genero: ").lower()
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
            criterio = input("buscar por titulo, autor o genero: ").lower()
            resultados = buscar_libros(criterio)
            if resultados:
                for libro in resultados:
                    pprint(libro)
            else:
                print("no se encontraron libros.")

        elif opcion == "5":
            reporte = reporte_populares()
            print("top 5 libros mas prestados:")
            for r in reporte:
                print(f"{r['titulo']} (autor: {r['autor']}) - prestamos: {r['total']}")

        elif opcion == "6":
            print("¡hasta luego!")
            break
        else:
            print("opcion no valida. intente de nuevo.")

if __name__ == "__main__":
    menu() 