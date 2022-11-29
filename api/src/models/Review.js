const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type:DataTypes.INTEGER,
      allowNull:false,

    },
    description:{
        type:DataTypes.STRING,
        
    },
    status:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
      
    },
  });
};
