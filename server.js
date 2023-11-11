require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('node-sequelize:server');
const { Logger } = require('./src/helper');
const { RedisConnection } = require('./src/config')

try{
    const app = express();
    app.use(helmet())

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    global.redis = RedisConnection();

    app.use('/users', require('./routes/Users'));
    app.use('/movie', require('./routes/Movies'));

    const port = normalizePort(process.env.PORT || '7000');

    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
    app.on('error', onError);
    app.on('listening', onListening);


    /**
     * Normalize a port into a number, string, or false.
    */

    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string' ?
            'Pipe ' + port :
            'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string' ?
            'pipe ' + addr :
            'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}catch(error){
    Logger.error(`Server Stating Error: ${error}`)
}