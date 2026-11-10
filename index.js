const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const db = require('./models')



app.use(cors())
app.use(express.json())

// Cek koneksi DB
db.sequelize.authenticate()
  .then(() => console.log(' Database MySQL Berhasil Konek!'))
  .catch(err => console.error(' Database Error:', err.message))

// Registered Routes
app.use('/auth', require('./routes/authRoute'))
app.use('/pelanggan', require('./routes/pelangganRoute'))
app.use('/users', require('./routes/userRoute'))
app.use('/tagihan', require('./routes/tagihanRoute'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})