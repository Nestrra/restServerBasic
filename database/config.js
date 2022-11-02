const mongoose = require('mongoose');



const dbConnection = async()=>{

try {
    
    await mongoose.connect(  process.env.MONGODB_CNN);

    console.log('Base de datos en linea')


} catch (error) {
    console.log(error)
    throw new Error('Error en conexoin a base de datos')
}



}

module.exports = {

    dbConnection

}