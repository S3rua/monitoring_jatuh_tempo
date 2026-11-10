module.exports = (sequelize, DataTypes) => {
  const pelanggan = sequelize.define('pelanggan', {
    pelanggan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING(100),
    nomor_telepon: DataTypes.STRING(20),
    alamat: DataTypes.TEXT
  }, {
    tableName: 'pelanggan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  pelanggan.associate = (models) => {
    pelanggan.hasMany(models.tagihan, { foreignKey: 'pelanggan_id' });
  };

  return pelanggan;
};