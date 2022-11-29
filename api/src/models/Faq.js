const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('faq', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    question:{
        type: DataTypes.TEXT
    },
    anwser:{
        type:DataTypes.TEXT
    }
  },
  {
    timestamps: false
  }) 
}