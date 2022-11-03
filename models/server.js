const express = require('express')
const cors = require('cors');
const auth = require('../routes/auth'); 
const usuarios = require('../routes/usuarios'); 
const { dbConnection } = require('../database/config');




class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Coneccion a base de datos
        this.conectarDB()



        //Middlewares
        this.middlewares();

        this.routes();

    }


    async conectarDB(){

        await dbConnection()

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
        this.app.use(this.authPath, auth) 
        


    }


    listen() {

        this.app.listen(this.port, () => {

            console.log('Servidor corriendo puerto', this.port)

        })

    }


}

module.exports = Server;