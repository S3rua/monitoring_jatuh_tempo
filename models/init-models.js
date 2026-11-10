var DataTypes = require("sequelize").DataTypes;
var _pelanggan = require("./pelanggan");
var _tagihan = require("./tagihan");
var _users = require("./users");

function initModels(sequelize) {
  var pelanggan = _pelanggan(sequelize, DataTypes);
  var tagihan = _tagihan(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  tagihan.belongsTo(pelanggan, { as: "pelanggan", foreignKey: "pelanggan_id"});
  pelanggan.hasMany(tagihan, { as: "tagihans", foreignKey: "pelanggan_id"});
  tagihan.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(tagihan, { as: "tagihans", foreignKey: "user_id"});

  return {
    pelanggan,
    tagihan,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
