const express = require('express')
const app = express()
app.use(express.json())

const authController = require('../controllers/authController')

app.post('/login', authController.login)

module.exports = app