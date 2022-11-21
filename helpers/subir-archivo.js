const path = require('path')
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 

const subirArchivo = ( files, extencionValida = ['png', 'jpg', 'jpeg', 'gif', 'pdf'], carpeta = '' ) => {

    return new Promise((reslve, reject) => {


        const { archivo } = files;
        const nombreC = archivo.name.split('.');
        const extencion = nombreC[nombreC.length - 1]


        if (!extencionValida.includes(extencion)) {
            return reject(`La extencion ${extencion} del archivo no es valida `)
        }

        const nomTemp = uuidv4() + '.' + extencion;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nomTemp)
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

           reslve(nomTemp)
        });


    })



}

module.exports = {

    subirArchivo

}