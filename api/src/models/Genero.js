//const sequelize = require('sequelize')
const { DataTypes } = require('sequelize');
const videogame =require('./Videogame');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Genero', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
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