const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');

const rutaPacientes = require('./routes/pacientes.route.js');
const rutaTurnos = require('./routes/turnos.route.js');
const rutaTurnosView = require('./routes/turnos.view.route.js');
const rutaAuth = require('./routes/auth.route.js');
const home = require('./routes/home.routes.js');

dotenv.config();

class Server {
    constructor(template = process.env.TEMPLATE || 'ejs') {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.middleware();
        //this.cors()
        this.engine(template);
        this.rutas();
    }
    
    /*   cors () {
         this.app.use(cors())
       } */

    engine(template) {
        try {
            require.resolve(template);
            this.app.set('view engine', template);
            this.app.set('views', path.join(__dirname, 'views', template));
        } catch (error) {
            console.log('Error al configurar el motor de plantillas:', template);
        }
    }

    middleware() {
        // this.app.use('/', express.static('public'))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        
        // Configuración de sesión y flash messagesconst path = require('path');
        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'secret',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(flash());

        // Variables globales para las vistas
        this.app.use((req, res, next) => {
            res.locals.user = req.session.user || null;
            next();
        });
    }

    rutas() {
        // API REST
        this.app.use('/api/v1/auth', rutaAuth);
        this.app.use('/api/v1/pacientes', rutaPacientes);
        this.app.use('/api/v1/turnos', rutaTurnos);
        
        // Vistas
        this.app.use('/turnos', rutaTurnosView);
        this.app.use('/', home);

        // aca van las otras rutas
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(
                `Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
            );
        });
    }
}

module.exports = Server;