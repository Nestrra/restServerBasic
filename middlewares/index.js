

const validaCampos    = require('../middlewares/validar-campos');
const validarJWT      = require('../middlewares/validar-jwt');
const validaRoles     = require('../middlewares/validar-role');
const validarArchivo  = require('../middlewares/validar-archivo' )


module.exports = {

    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo

}