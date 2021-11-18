'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.belongsTo(models.Course, {foreignKey: 'CourseId'})
      Content.belongsToMany(models.User, {through: 'UserId'})
    }
  };
  Content.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};