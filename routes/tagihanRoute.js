const express = require('express')
const app = express()
app.use(express.json())

const tagihanController = require('../controllers/tagihanController')
const { authorize } = require('../middlewares/authMiddleware')
const { IsAdmin, IsUserOrAdmin } = require('../middlewares/roleValidation')

// Semua orang yang login (User & Admin) bisa lihat data tagihan
app.get('/', authorize, IsUserOrAdmin, tagihanController.getAll)
app.get('/:key', authorize, IsUserOrAdmin, tagihanController.find)

// Cuma Admin yang boleh Tambah, Edit, dan Hapus Tagihan
app.post('/', authorize, IsAdmin, tagihanController.add)
app.put('/:id', authorize, IsAdmin, tagihanController.update)
app.delete('/:id', authorize, IsAdmin, tagihanController.delete)

module.exports = app