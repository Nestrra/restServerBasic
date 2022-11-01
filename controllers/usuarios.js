const { response  }= require('express')



const usuariosGet =  ( req, res = response)=>{

    const { q, nombre, apikey } = req.query


    res.json({

        msg: 'get API - controlador',
        query

    })


}

const usuariosPost = ( req, res= response )=>{

    const body = req.body;

    res.json({

        msg:' Post desde controlador  ',
        body


    })


}

const usuariosPut = ( req, res= response )=>{

    const id = req.params.id;


    res.json({

        msg:' Put desde controlador',
        id

    })


}

const usuariosPatch = ( req, res= response )=>{



    res.json({

        msg:' Patch desde controlador  '

    })


}

const usuariosDelete = ( req, res= response )=>{

    res.json({

        msg:' Delete desde controlador  '

    })


}






module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete


}