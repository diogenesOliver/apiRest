const mongoose = require('mongoose')

const User = mongoose.model('User', {

    username: {type: String, required: true, minlength: 3, maxlength: 50},
    password: {type: String, required: true, minlength: 6, maxlength: 50},
    confirmpassword: {type: String, required: true, minlength: 6, maxlength: 50},
    email: {type: String, required: true, minlength: 10, maxlength: 50},
    age: {type: Number, required: true},
    admin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}

})

module.exports = User