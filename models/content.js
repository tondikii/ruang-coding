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
    nickNameByGender(){
      if (this.gender === 'Male') return `Mr ${this}`
    }
  };
  Content.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
    CourseId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};