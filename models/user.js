'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Promo, {foreignKey: 'UserId'});
      User.belongsToMany(models.Content, {through: 'UserId'});
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        minLength(value){
          if (value.length < 8) throw new Error("username characters must be greater than 8");
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        minLength(value){
          if (value.length < 8) throw new Error("password characters must be greater than 8");
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        notEmpty: true
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        minLength(value){
          if (value.length < 11) throw new Error("phone number characters must be greater than equal 11");
          if (value.length > 13) throw new Error("phone number characters must be less than equal 13");
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options){
        // console.log(instance.password);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        // console.log(hash);
        instance.password = hash;
        if (!instance.role) instance.role = 'user';
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};