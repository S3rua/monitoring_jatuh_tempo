const express = require('express')
const app = express()
app.use(express.json())

const userController = require('../controllers/userController')
const { authorize } = require('../middlewares/authMiddleware')
const { IsAdmin, IsUserOrAdmin } = require('../middlewares/roleValidation')

// GET All & Find: Bisa diakses oleh User maupun Admin
app.get('/', authorize, IsUserOrAdmin, userController.getAll)
app.get('/find/:key', authorize, IsUserOrAdmin, userController.find)

// ADD, UPDATE, DELETE: Khusus Admin!
app.post('/', authorize, IsAdmin, userController.add)
app.put('/:id', authorize, IsAdmin, userController.update)
app.delete('/:id', authorize, IsAdmin, userController.delete)

module.exports = app