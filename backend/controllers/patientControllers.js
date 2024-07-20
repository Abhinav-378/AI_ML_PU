const Patient = require('../models/patientModel')
const User = require('../models/userModel')

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

exports.signup = async(req, res)=>{
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            success: true,
            message: `User Signup Successful. Welcome ${user.contact}`,
            user
        });
    } catch (error) {
        console.log(error); // Log the error
        res.status(500).json({ message: error.message });
    }
}

exports.signin = async (req, res) => {
    try {
        const { contact, password } = req.body;

        if (!contact || !password) {
            throw new Error("Fill all the fields");
        }

        const userExists = await User.findOne({ contact });
        if (!userExists) {
            throw new Error("User does not exist");
        }
        if (userExists.password !== password) {
            throw new Error("Incorrect Password");
        }

        res.status(200).json({
            success: true,
            message: `User Login Successful. Welcome ${userExists.contact}`,
            user: {
                name: userExists.name, // Include name
                contact: userExists.contact
            }
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
