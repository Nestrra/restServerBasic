const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto,obtenerProductos, obtenerProductoID, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeProductoID, existeCategoriaID } = require('../helpers/db-validators');

const router = Router();




router.get('/', obtenerProductos)

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos,
    
], obtenerProductoID);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Nop es un ID de mongo Valido').isMongoId(),
    check('categoria').custom( existeCategoriaID ),
    validarCampos

], crearProducto);

router.put('/:id',[
    validarJWT,
    //check('categoria', 'Nop es un ID de mongo Valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos,
] ,actualizarProducto);


router.delete('/:id',[
    validarJWT,
    esAdminRole,    
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos,
]  ,eliminarProducto);



module.exports = router