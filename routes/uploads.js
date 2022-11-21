const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo, validarCampos } = require('../middlewares');


const router = Router();


router.post('/', validarArchivo, cargarArchivos)

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
  
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos], 
    mostrarImagen)


module.exports = router