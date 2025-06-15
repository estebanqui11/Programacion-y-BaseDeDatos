const Server = require('./server');
const { initDatabase } = require('./config/database');

const init = async () => {
    await initDatabase();
    const server = new Server();
    server.listen();
};

init();