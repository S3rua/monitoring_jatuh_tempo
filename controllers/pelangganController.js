const { pelanggan } = require('../models')
const { Op } = require('sequelize')

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await pelanggan.findAll()
    return res.json({ success: true, data, message: 'Semua pelanggan berhasil dimuat' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// SEARCH
exports.find = async (req, res) => {
  const keyword = req.params.key
  try {
    const data = await pelanggan.findAll({
      where: {
        [Op.or]: [
          { nama: { [Op.substring]: keyword } },
          { nomor_telepon: { [Op.substring]: keyword } },
          { alamat: { [Op.substring]: keyword } }
        ]
      }
    })
    return res.json({ success: true, data, message: 'Data pelanggan berhasil ditemukan' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// CREATE
exports.add = async (req, res) => {
  try {
    const newPelanggan = {
      nama: req.body.nama,
      nomor_telepon: req.body.nomor_telepon,
      alamat: req.body.alamat
    }
    const data = await pelanggan.create(newPelanggan)
    return res.json({ success: true, data, message: 'Pelanggan berhasil ditambahkan' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// UPDATE
exports.update = async (req, res) => {
  try {
    const dataPelanggan = {
      nama: req.body.nama,
      nomor_telepon: req.body.nomor_telepon,
      alamat: req.body.alamat
    }
    await pelanggan.update(dataPelanggan, { where: { pelanggan_id: req.params.id } })
    return res.json({ success: true, message: 'Data pelanggan berhasil diubah' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// DELETE
exports.delete = async (req, res) => {
  try {
    await pelanggan.destroy({ where: { pelanggan_id: req.params.id } })
    return res.json({ success: true, message: 'Pelanggan berhasil dihapus' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}