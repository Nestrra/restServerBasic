const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');



const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([

        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        usuarios,
    })


}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);



    await usuario.save();

    res.json({

        msg: ' Post desde controlador  ',
        usuario


    })


}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Validar contra base de datos

    if (password) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({

        msg: ' Put desde controlador',
        usuario

    })


}

const usuariosPatch = (req, res = response) => {



    res.json({

        msg: ' Patch desde controlador  '

    })


}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params

    //Eliminar de la base de datos
    // const usuario = await Usuario.findByIdAndDelete(id)

const usuario = await Usuario.findByIdAndUpdate( id, { estado:false })

    res.json({

        usuario

    })


}






module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete


}