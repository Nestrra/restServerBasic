const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Categoria,
    Usuario,
    Producto  } = require('../models');


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];
const buscarCategorias = async ( termino = '', res = response   ) =>{

    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {

        const categoria = await Categoria.findById(termino)
       return res.json({
            resultados:( categoria ) ? [categoria]: []
        })

    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({ nombre: regex });

             res.json({
            resultados:categorias
        })
}

const buscarProductos = async ( termino = '', res = response   ) =>{

    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {

        const producto = await Producto.findById(termino)
       return res.json({
            resultados:( producto ) ? [producto]: []
        })

    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({ nombre: regex });

             res.json({
            resultados:productos
        })
}

const buscarUsuarios = async ( termino = '', res = response   ) =>{

        const esMongoID = ObjectId.isValid(termino)

        if (esMongoID) {

            const usuario = await Usuario.findById(termino)
           return res.json({
                resultados:( usuario ) ? [usuario]: []
            })

        }

        const regex = new RegExp(termino, 'i')

        const usuarios = await Usuario.find({ 
            $or:[ {nombre: regex}, { correo:regex  }],
            $and: [{ estado:true }]

         });

                 res.json({
                resultados:usuarios
            })


}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {

        return res.json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })

    }

    switch (coleccion) {

        case 'usuarios':
            buscarUsuarios(termino, res)
        break;
        case 'categorias':
            buscarCategorias(termino, res)
        break;
        case 'productos':
            buscarProductos(termino, res)
        break;

        default:
            res.status(500).json({
                msg:'Busqueda sin implementar'
            })
    }

}


module.exports = {

    buscar

}