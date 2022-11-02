
const  Role  = require('../models/role')
const Usuario = require('../models/usuario')
 
const esRoleValido = async ( role = '' )=>{

    const existeRol = await Role.findOne({ role });

        if (!existeRol) {
            throw new Error( `El rol ${role} no esta registrado en la BD`)
        }
}

const emailExiste = async (correo = '')=>{

    const existeEmail = await Usuario.findOne({ correo } );

    if (existeEmail) {
        throw new Error( `El email ${correo} ya esta registrado en la BD`)
    }
}

const existeUsuarioID = async (id)=>{

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error( `El id ${id} no existe en la BD`)
    }
}

module.exports = {

    esRoleValido,
    emailExiste,
    existeUsuarioID
 
}