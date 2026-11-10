const jwt = require('jsonwebtoken')
const SECRET_KEY = "monitoring_jatuh_tempo_secret_key"

exports.authorize = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Akses ditolak! Token tidak ditemukan."
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET_KEY, (err, userDecoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token tidak valid atau sudah kadaluwarsa!"
            })
        }

        req.user = userDecoded
        next()
    })
}