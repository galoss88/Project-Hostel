const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('client', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    personalID: { //documento/pasaporte
      type: DataTypes.CHAR
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.CHAR,
    },
    email: {
      type: DataTypes.STRING,
    },
    idAuth: {
      type: DataTypes.TEXT
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    con: {
      type: DataTypes.STRING,
      defaultValue: 'Connected'
    }
  },
    {
      timestamps: false
    })
}