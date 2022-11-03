const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generarJWT')




const login = async (req, res = response) => {

    const { correo, password } = req.body


    try {
          //Verificar usuario
    const usuario = await Usuario.findOne({correo})

    if (!usuario) {
        return res.json({
            msg: 'El correo no esta registrado'
        })
    }

    //Usuario activo
    if (!usuario.estado) {
        return res.json({
            msg: 'El usuario esta inactivo'
        })
    }

    //Verificar contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password )
    if (!validPassword) {
        return res.json({
            msg: 'Contraseña incorrecta'
        })
    }


    const token = await generarJWT( usuario.id )


        res.json({

            usuario,
            token
          
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({

            msg: 'Hable con el administrador'

        })
    }
}

module.exports = {

    login,

}