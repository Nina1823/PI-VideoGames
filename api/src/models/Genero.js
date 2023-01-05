//const sequelize = require('sequelize')
const { DataTypes } = require('sequelize');
const videogame =require('./Videogame');

module.exports = (sequelize) => {
    sequelize.define('genero', {
        id: {
            type: DataTypes.INTEGER,//int
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