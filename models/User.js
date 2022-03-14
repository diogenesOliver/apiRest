const mongoose = require('mongoose')

const User = mongoose.model('User', {

    username: {type: String, required: true},
    password: {type: String, required: true},
    confirmpassword: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true}

})

module.exports = User