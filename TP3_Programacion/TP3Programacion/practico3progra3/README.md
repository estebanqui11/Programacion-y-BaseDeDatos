# Sistema de Gestión de Turnos Médicos - Clínica Salud+

Este proyecto implementa un sistema de gestión de turnos médicos para la Clínica Salud+, desarrollado con Node.js y Express.

## Características

- API REST para gestión de turnos
- Sistema de autenticación JWT
- Interfaz web para gestión local de turnos
- Validación de datos con Joi
- Base de datos SQLite con Sequelize

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/santozzi/practico3progra3.git
cd practico3progra3
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env en la raíz del proyecto:
```
PORT=3000
HOST=http://localhost
TEMPLATE=ejs
JWT_SECRET=tu_secret_key
```

4. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints API REST

### Autenticación

- POST `/api/v1/auth/registro`
  - Registro de nuevo usuario
  - Body: `{ "email": "usuario@ejemplo.com", "password": "contraseña" }`

- POST `/api/v1/auth/login`
  - Inicio de sesión
  - Body: `{ "email": "usuario@ejemplo.com", "password": "contraseña" }`

### Turnos

- GET `/api/v1/turnos/:idPaciente`
  - Consultar turnos de un paciente
  - Requiere: ID del paciente en la URL

- POST `/api/v1/turnos`
  - Crear nuevo turno
  - Requiere: Token JWT en header Authorization
  - Body: `{ "idPaciente": 1, "fecha": "2024-03-25T10:00:00" }`

- DELETE `/api/v1/turnos/:idTurno`
  - Cancelar un turno
  - Requiere: ID del turno en la URL

## Interfaz Web

- `/turnos` - Lista de turnos
- `/turnos/nuevo` - Crear nuevo turno
- `/turnos/:id/cancelar` - Cancelar turno

## Validaciones

- Email: Debe ser un email válido
- Contraseña: Mínimo 8 caracteres
- Fecha de turno: Debe ser posterior a la fecha actual
- ID de paciente: Debe ser un número válido

## Tecnologías Utilizadas

- Node.js
- Express
- Sequelize (SQLite)
- JWT para autenticación
- EJS para vistas
- Joi para validaciones

## Integrantes del Grupo

[Agregar nombres de los integrantes]

## Capturas de Pantalla

[Agregar capturas de pantalla de la aplicación funcionando] 