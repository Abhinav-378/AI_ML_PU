const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    contact:{
        type: String,
        required: [true, 'Contact is required']
    },
    password:{
        type: String,
        required: [true, 'pswd is required'],
    }
})

module.exports = mongoose.model("User",userSchema)