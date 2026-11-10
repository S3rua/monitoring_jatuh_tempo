exports.IsAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        return res.status(403).json({
            success: false,
            message: "Akses ditolak! Khusus untuk Admin."
        })
    }
}

exports.IsUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next()
    } else {
        return res.status(403).json({
            success: false,
            message: "Akses ditolak! Khusus untuk User."
        })
    }
}

exports.IsUserOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'user')) {
        next()
    } else {
        return res.status(403).json({
            success: false,
            message: "Akses ditolak!"
        })
    }
}