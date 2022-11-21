
const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role')


const esRoleValido = async (role = '') => {

    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El email ${correo} ya esta registrado en la BD`)
    }
}

const existeUsuarioID = async (id) => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}

const existeCategoriaID = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}

const existeProductoID = async (id) => {

    const existeProduucto = await Producto.findById(id);

    if (!existeProduucto) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}


const coleccionesPermitidas = ( coleccion = '', colecciones=[] )=>{

    const incluida = colecciones.includes(coleccion)

        if (!incluida) {
            
                throw new Error('La coleccion no esta permitida')

        }

        return true


}



module.exports = {

    esRoleValido,
    emailExiste,
    existeUsuarioID,
    existeCategoriaID,
    existeProductoID,
    coleccionesPermitidas

}