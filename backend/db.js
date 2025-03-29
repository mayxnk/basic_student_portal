const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { 
    type: String,
    required: true,
    trim: true
    },
    lastName: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        email: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    }
})

const Student = mongoose.model('Student',studentSchema)

module.exports = {
    Student
}