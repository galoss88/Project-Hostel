const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('rent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    dateReserva: {
      type: DataTypes.DATEONLY,
    },
    dateIn: {
        type: DataTypes.STRING,
    },
    dateOut: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DOUBLE,
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
    pago_id:{
      type: DataTypes.STRING
    },
    bed_id: {
      type: DataTypes.FLOAT
    },
    client_id: {
      type: DataTypes.FLOAT
    }
  },
  {
    timestamps: false
  });
};