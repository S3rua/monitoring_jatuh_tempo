const { users } = require('../models')
const md5 = require('md5')
const { Op } = require('sequelize')

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await users.findAll({ attributes: { exclude: ['password'] } })
    return res.json({ success: true, data, message: 'Semua user berhasil dimuat' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// SEARCH
exports.find = async (req, res) => {
  const keyword = req.params.key
  try {
    const data = await users.findAll({
      where: {
        [Op.or]: [
          { nama: { [Op.substring]: keyword } },
          { username: { [Op.substring]: keyword } },
          { role: { [Op.substring]: keyword } }
        ]
      },
      attributes: { exclude: ['password'] }
    })
    return res.json({ success: true, data, message: 'Data user berhasil ditemukan' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// CREATE
exports.add = async (req, res) => {
  try {
    const newUser = {
      nama: req.body.nama,
      username: req.body.username,
      password: md5(req.body.password),
      role: req.body.role || 'user'
    }
    const data = await users.create(newUser)
    return res.json({ success: true, data, message: 'User baru berhasil ditambahkan' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// UPDATE
exports.update = async (req, res) => {
  try {
    const dataUser = {
      nama: req.body.nama,
      username: req.body.username,
      role: req.body.role
    }
    if (req.body.password) {
      dataUser.password = md5(req.body.password)
    }
    await users.update(dataUser, { where: { user_id: req.params.id } })
    return res.json({ success: true, message: 'Data user berhasil diubah' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// DELETE
exports.delete = async (req, res) => {
  try {
    await users.destroy({ where: { user_id: req.params.id } })
    return res.json({ success: true, message: 'User berhasil dihapus' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}