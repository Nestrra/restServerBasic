const express = require('express')
const cors = require('cors');
const usuarios = require('../routes/usuarios') 




class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        this.routes();

    }


    middlewares() {

        //cors
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.usuariosPath, usuarios) 

    }


    listen() {

        this.app.listen(this.port, () => {

            console.log('Servidor corriendo puerto', this.port)

        })

    }


}

module.exports = Server;