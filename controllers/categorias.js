const { response } = require("express");
const { Categoria } = require('../models')





// obtener Categorias - paginado- total - populate
const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, categorias] = await Promise.all([

        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        categorias,
    })


}


//Obtener categoria - populate
const obtenerCategoriaID = async (req, res = response) => {

    const { id } = req.params
    const categoria = await Categoria.findById(id)

    res.json({categoria})

}





const crearCategoria = async (req, res = response) => {


    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({

            msg: `La categoria ${categoriaDB}, ya existe`

        })
    }

    const data = {
        nombre,
        usuario: req.usua._id
    }


    const categoria = new Categoria(data)

    await categoria.save();

    res.status(201).json(categoria)


}



//Actualizar Categoria
const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data  } = req.body

   data.nombre = data.nombre.toUpperCase();
   data.usua = req.usua._id;

    //Validar contra base de datos

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    res.json( categoria )


}





// Borarr Categoria - estado false

const eliminarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const uid = req.uid;
    const usuarioAD = req.usua

    //Eliminar de la base de datos
    // const usuario = await Usuario.findByIdAndDelete(id)

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, {new: true})

    res.json({

        categoria        
    })


}






module.exports = {

    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaID,
    eliminarCategoria,
    actualizarCategoria


}