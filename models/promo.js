'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promo.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Promo.init({
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    UserId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Promo',
  });
  return Promo;
};