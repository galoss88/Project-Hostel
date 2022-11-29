const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('room', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    bathroom: {
      type: DataTypes.BOOLEAN
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    observation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    beds_avalaibles:{
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  });
};
