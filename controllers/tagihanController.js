const { tagihan, pelanggan, users } = require('../models')
const { Op } = require('sequelize')

// GET ALL (Termasuk Relasi Join Pelanggan dan Users)
exports.getAll = async (req, res) => {
  try {
    const data = await tagihan.findAll({
      include: [
        { model: pelanggan, attributes: ['nama', 'nomor_telepon', 'alamat'] },
        { model: users, attributes: ['nama', 'username', 'role'] }
      ]
    })
    return res.json({ success: true, data, message: 'Semua tagihan berhasil dimuat' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// SEARCH BY STATUS / NAMA TAGIHAN
exports.find = async (req, res) => {
  const keyword = req.params.key
  try {
    const data = await tagihan.findAll({
      where: {
        [Op.or]: [
          { nama_tagihan: { [Op.substring]: keyword } },
          { status_pembayaran: { [Op.substring]: keyword } },
          { keterangan: { [Op.substring]: keyword } }
        ]
      },
      include: [
        { model: pelanggan, attributes: ['nama', 'nomor_telepon'] },
        { model: users, attributes: ['nama'] }
      ]
    })
    return res.json({ success: true, data, message: 'Data tagihan berhasil ditemukan' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// CREATE
exports.add = async (req, res) => {
  try {
    const newTagihan = {
      pelanggan_id: req.body.pelanggan_id,
      user_id: req.body.user_id,
      nama_tagihan: req.body.nama_tagihan,
      nominal: req.body.nominal,
      tanggal_tagihan: req.body.tanggal_tagihan,
      tanggal_jatuh_tempo: req.body.tanggal_jatuh_tempo,
      status_pembayaran: req.body.status_pembayaran || 'belum_bayar',
      tanggal_pembayaran: req.body.tanggal_pembayaran || null,
      keterangan: req.body.keterangan
    }
    const data = await tagihan.create(newTagihan)
    return res.json({ success: true, data, message: 'Tagihan baru berhasil dibuat' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// UPDATE
exports.update = async (req, res) => {
  try {
    const dataTagihan = {
      pelanggan_id: req.body.pelanggan_id,
      user_id: req.body.user_id,
      nama_tagihan: req.body.nama_tagihan,
      nominal: req.body.nominal,
      tanggal_tagihan: req.body.tanggal_tagihan,
      tanggal_jatuh_tempo: req.body.tanggal_jatuh_tempo,
      status_pembayaran: req.body.status_pembayaran,
      tanggal_pembayaran: req.body.tanggal_pembayaran,
      keterangan: req.body.keterangan
    }
    await tagihan.update(dataTagihan, { where: { tagihan_id: req.params.id } })
    return res.json({ success: true, message: 'Data tagihan berhasil diperbarui' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

// DELETE
exports.delete = async (req, res) => {
  try {
    await tagihan.destroy({ where: { tagihan_id: req.params.id } })
    return res.json({ success: true, message: 'Tagihan berhasil dihapus' })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
} 