const express = require('express')
const cors = require('cors');
const auth = require('../routes/auth'); 
const usuarios = require('../routes/usuarios'); 
const categorias = require('../routes/categorias'); 
const productos = require('../routes/productos'); 
const { dbConnection } = require('../database/config');
const  buscar  = require('../routes/buscar');




class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:      '/api/auth' ,
            usuarios:  '/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar: '/api/buscar'
        }
 

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

        this.app.use(this.paths.usuarios, usuarios) 
        this.app.use(this.paths.categorias, categorias) 
        this.app.use(this.paths.auth, auth) 
        this.app.use(this.paths.productos, productos) 
        this.app.use(this.paths.buscar, buscar)
    
    }


    listen() {

        this.app.listen(this.port, () => {

            console.log('Servidor corriendo puerto', this.port)

        })

    }


}

module.exports = Server;