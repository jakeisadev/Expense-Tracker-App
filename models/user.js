const mongoose = require('mongoose')
// Initalize MongoDB

const userSchema = new mongoose.Schema({
    // Create the layout of the User object
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

// Attach usermodel to the new objects
const usermodel = mongoose.model('Users', userSchema)

// Return each new usermodel to the database for access
module.exports = usermodel