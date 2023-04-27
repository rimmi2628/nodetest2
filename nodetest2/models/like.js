'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Post,{
        foreignKey:"post_id",
        onDelete:"CASCADE"
      });

    }
  }
  Like.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    is_like: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};