
const path = require('path')
const fs = require('fs')
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models')
const cloudinary = require('cloudinary').v2

cloudinary.config( process.env.CLOUDINARY_URL )

const cargarArchivos = async (req, res = response) => {


  try {
    const nombre = await subirArchivo(req.files);

    res.json({

      nombre

    })

  } catch (msg) {
    res.status(400).json({

      msg
    })
  }
}



const actualizarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: 'No existe el usuario'
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: 'No existe el producto'
        })
      }
      break;

    default:
      return res.status(500).json({
        msg: 'No esta establecida'

      })
  }

  if (modelo.img) {

    const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)

    if (fs.existsSync(pathImage)) {

      fs.unlinkSync(pathImage);

    }

  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);


  modelo.img = nombre

  await modelo.save();

  res.json(modelo)

}

const mostrarImagen =async( req, res=response  )=>{
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: 'No existe el usuario'
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: 'No existe el producto'
        })
      }
      break;

    default:
      return res.status(500).json({
        msg: 'No esta establecida'

      })
  }

  if (modelo.img) {

    const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)

    if (fs.existsSync(pathImage)) {
        return   res.sendFile(pathImage)

            }

  }

  res.json(
    {
      msg: 'No hay imagen'
    }
  )

}


const actualizarImagenCloudinary = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: 'No existe el usuario'
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: 'No existe el producto'
        })
      }
      break;

    default:
      return res.status(500).json({
        msg: 'No esta establecida'

      })
  }

  if (modelo.img) {
    
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[ nombreArr.length -1 ]
      const [ public_id ] = nombre.split('.');
       cloudinary.uploader.destroy(public_id)
  }

  const { tempFilePath  }=req.files.archivo;

 const {secure_url} = await cloudinary.uploader.upload( tempFilePath);

   modelo.img = secure_url

   await modelo.save();

  res.json(modelo)

}



module.exports = {

  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary

}