const { response } = require("express");


const esAdminRole = (req, res = response, next) => {

    if (!req.usua) {
        return res.status(500).json({
            msg: 'Por favor comunique con el administrador'

        })
    }


    const { role, nombre } = req.usua;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`

        })
    }




    next()


}

module.exports = {

    esAdminRole

}