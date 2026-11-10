const express = require('express')
const app = express()
app.use(express.json())

const pelangganController = require('../controllers/pelangganController')
const { authorize } = require('../middlewares/authMiddleware')
const { IsAdmin, IsUserOrAdmin } = require('../middlewares/roleValidation')

// GET All & Find Pelanggan: User dan Admin bisa lihat
app.get('/', authorize, IsUserOrAdmin, pelangganController.getAll)
app.get('/find/:key', authorize, IsUserOrAdmin, pelangganController.find)

// POST, PUT, DELETE Pelanggan: Khusus Admin
app.post('/', authorize, IsAdmin, pelangganController.add)
app.put('/:id', authorize, IsAdmin, pelangganController.update)
app.delete('/:id', authorize, IsAdmin, pelangganController.delete)

module.exports = app