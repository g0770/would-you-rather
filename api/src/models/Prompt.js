const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Prompt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    opt1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    opt2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    context: {
      type: DataTypes.STRING,
      allowNull: false
    },
    votesOpt1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    votesOpt2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: false });
};