# Sistema de Biblioteca Digital

## Proyecto elegido
Sistema de biblioteca digital

## Integrantes del grupo
- Esteban Julian Granito Quiñones
- Lauto Gimenez
- Juan Fogel
- Geronimo Moraga

## Tecnología utilizada
- Python 3
- MongoDB
- Pymongo
- Flask (interfaz web)
- Interfaz por consola y web

## Estructura de carpetas/archivos
- `biblioteca.py`: funciones principales del sistema
- `config.py`: configuración de la base de datos
- `main.py`: menú de consola para interactuar
- `app.py`: aplicación web con Flask
- `requirements.txt`: dependencias
- `.env`: variables de entorno (ver ejemplo abajo)
- `vistas/`: plantillas HTML para la web
- `recursos/`: archivos estáticos (CSS)

## Cómo ejecutar el proyecto
### 1. Instalar dependencias:
```bash
pip install -r requirements.txt
```
### 2. Configurar la conexión a MongoDB en un archivo `.env` (ver ejemplo abajo).
### 3. Ejecutar la versión por consola:
```bash
python main.py
```
### 4. Ejecutar la versión web:
```bash
python app.py
```

## Ejemplo de archivo `.env`
```
mongo_uri=mongodb://localhost:27017/
db_name=biblioteca_db
```

## Notas
- El sistema permite agregar libros, registrar préstamos, devoluciones, buscar libros y ver el top 5 de libros más prestados.
- Hay dos interfaces: por consola y web (Flask).
