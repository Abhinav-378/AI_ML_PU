const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    healthIssue:{
        type: String,
        required: [true, 'Health issue is required']
    },
    contact:{
        type: String,
        required: [true, 'Contact is required'],
    }
})

module.exports = mongoose.model("Patient",patientSchema)