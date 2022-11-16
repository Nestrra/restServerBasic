const { response } = require("express");
const { Producto } = require("../models");


const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, productos] = await Promise.all([

        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        productos,
    })

}


const crearProducto = async (req, res = response) => {



    const { estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre })

    if (productoDB) {
        return res.status(400).json({

            msg: `El producto  ${productoDB}, ya existe`

        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usua._id
    }

    const producto = new Producto(data)

    await producto.save();

    res.status(201).json(producto)


}


const obtenerProductoID = async (req, res = response) => {

    const { id } = req.params
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json(producto)


}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usua = req.usua._id;

    //Validar contra base de datos

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json(producto)


}

const eliminarProducto = async (req, res = response) => {


    const { id } = req.params;
    const uid = req.uid;
    const usuarioAD = req.usua

    //Eliminar de la base de datos
    // const usuario = await Usuario.findByIdAndDelete(id)

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, {new: true})

    res.json({

        producto        
    })
}


module.exports = {

    crearProducto,
    obtenerProductos,
    obtenerProductoID,
    actualizarProducto,
    eliminarProducto

}