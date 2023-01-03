//const sequelize = require('sequelize')
const { DataTypes } = require('sequelize');
const videogame =require('./Videogame');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genero', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    ,{timestamps:false}
    );
};