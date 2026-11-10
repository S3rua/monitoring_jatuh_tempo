module.exports = (sequelize, DataTypes) => {
  const tagihan = sequelize.define('tagihan', {
    tagihan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pelanggan_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    nama_tagihan: DataTypes.STRING(150),
    nominal: DataTypes.DECIMAL(15, 2),
    tanggal_tagihan: DataTypes.DATEONLY,
    tanggal_jatuh_tempo: DataTypes.DATEONLY,
    status_pembayaran: DataTypes.ENUM('belum_bayar', 'lunas'),
    tanggal_pembayaran: DataTypes.DATEONLY,
    keterangan: DataTypes.TEXT
  }, {
    tableName: 'tagihan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  tagihan.associate = (models) => {
    tagihan.belongsTo(models.pelanggan, { foreignKey: 'pelanggan_id' });
    tagihan.belongsTo(models.users, { foreignKey: 'user_id' });
  };

  return tagihan;
};