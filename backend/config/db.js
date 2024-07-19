const mongoose = require('mongoose')

const connectToDb = async ()=>{
    mongoose.connect("mongodb+srv://abhi05:abhi7505@cluster0.hohduyy.mongodb.net/patientRec")
    .then((conn)=>{
        console.log(`connected to db: ${conn.connection.host}`);
    })
    .catch((err)=>{
        console.log(err.message);
        process.exit(1)
    })
}

module.exports = connectToDb