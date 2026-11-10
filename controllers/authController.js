const { users } = require('../models')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

// Secret Key bebas, tapi wajib diingat
const SECRET_KEY = "monitoring_jatuh_tempo_secret_key"

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        // Cari user berdasarkan username & password (di-hash md5)
        const findUser = await users.findOne({
            where: {
                username: username,
                password: md5(password)
            }
        })

        if (!findUser) {
            return res.status(401).json({
                success: false,
                message: "Username atau password salah!"
            })
        }

        // Data payload yang dimasukkan ke dalam token
        const payload = {
            user_id: findUser.user_id,
            nama: findUser.nama,
            username: findUser.username,
            role: findUser.role
        }

        // Generate Token JWT (berlaku 1 hari)
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })

        return res.json({
            success: true,
            message: "Login berhasil!",
            token: token,
            data: payload
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}