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
      type:DataTypes.STRING,
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
      defaultValue: "https://www.curn.edu.co/images/ZARINA.jpg",
      validate:{isUrl:true}
    }
  }
  ,{timestamps:false}
  );
};
