require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const linkController = require('./routeController/linkController')
const authController = require('./routeController/authController')

const app = express()

app.use('/', express.json(), express.urlencoded({ extended: true }))
app.use('/admin', express.json(), express.urlencoded({ extended: true }), authController)

app.get('/admin', authController, linkController.routeAdmin)

app.post('/createUser', linkController.createUser)
app.post('/loginUser', linkController.loginUser)

mongoose.connect(process.env.DB_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connect in Data Base - server run on server: ${process.env.PORT}`)
    })
}).catch(error => {
    console.log(error)
})