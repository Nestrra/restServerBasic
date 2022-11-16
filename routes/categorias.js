const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaID, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


//Obtener todas la categorias - publico
router.get('/', obtenerCategorias)

//Obtener categoria por id
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos,
    
], obtenerCategoriaID);

//Crear categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

], crearCategoria);

//Actualizar categoria
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaID),
    validarCampos,
] ,actualizarCategoria);

//Eliminar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,    
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos,
]  ,eliminarCategoria);


module.exports = router