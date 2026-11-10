module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING(100),
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(255),
    role: DataTypes.ENUM('admin', 'user')
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at', // Map createdAt bawaan Sequelize ke created_at di DB
    updatedAt: 'updated_at'  // Map updatedAt bawaan Sequelize ke updated_at di DB
  });

  users.associate = (models) => {
    users.hasMany(models.tagihan, { foreignKey: 'user_id' });
  };

  return users;
};