const Patient = require('../models/patientModel')

exports.home = (req, res)=>{
    res.send("Hello world")
}

exports.setPatients = async(req, res)=>{
    try {
        const patient = await Patient.create(req.body)
        res.status(200).json(patient)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getPatients = async(req, res)=>{
    try {
        const patient = await Patient.find({})
        res.status(200).json(patient)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}