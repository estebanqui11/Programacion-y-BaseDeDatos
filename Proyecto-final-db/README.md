# sistema de biblioteca digital

## proyecto elegido
sistema de biblioteca digital

## integrantes del grupo
- Esteban Julian Granito Quiñones , Lauto Gimenez , Juan Fogel , Geronimo Moraga

## tecnologia utilizada
- python 3
- mongodb
- pymongo
- interfaz por consola

## estructura de carpetas/archivos
- `biblioteca.py`: funciones principales del sistema
- `config.py`: configuracion de la base de datos
- `main.py`: menu de consola para interactuar
- `requirements.txt`: dependencias
- `.env`: variables de entorno (ver ejemplo en `.env.example`)

## como ejecutar el proyecto
1. instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
2. configurar la conexion a mongodb en un archivo `.env` (ver ejemplo abajo).
3. ejecutar el sistema:
   ```bash
   python main.py
   ```

## ejemplo de archivo `.env`
```
mongo_uri=mongodb://localhost:27017/
db_name=biblioteca_db
```

## notas
- el sistema permite agregar libros, registrar prestamos, devoluciones, buscar libros y ver el top 5 de libros mas prestados.
- la interfaz es por consola para facilitar el uso y la correccion.
- proyecto realizado para la entrega final de la materia. 