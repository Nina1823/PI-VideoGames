const { DataTypes,sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,//es alfanumerico
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    nombre:{
      type:DataTypes.STRING,
      allowNull:false
    },
    descripcion:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    lanzamiento:{
      type:DataTypes.STRING,
      allowNull:true
    },
    calificacion:{
      type: DataTypes.STRING,
      allowNull:true
    },
    plataformas:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    imagen:{
      type:DataTypes.STRING,
      defaultValue: "https://www.pngfind.com/pngs/m/645-6457086_logo-de-los-videojuegos-hd-png-download.png",
      validate:{isUrl:true}
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  }
  ,{timestamps:false}
  );
};
