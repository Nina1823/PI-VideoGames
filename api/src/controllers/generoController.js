require('dotenv').config();//lee los env
const axios = require("axios");
const { API } = process.env;// me traigo la key
const { Genero } = require("../db");
const url = "https://api.rawg.io/api/genres";

//guardar los generos en la bd
module.exports = {
    guardarGenerosBd: async function () {
        let info = [];
        const generoUrl = await axios.get(url + "?key=" + API);

        generoUrl.data.results.map(async cbgen => {
            let guardar = {
                "id": cbgen.id,
                "nombre": cbgen.name.toLowerCase()
            }
            info.push(guardar);
            await Genero.findOrCreate({
                where: {
                    id: guardar.id, //comparacion con lo que hay en la tabla : var 
                    nombre: guardar.nombre
                }
            });
        })
        
        
        return info;
    }
}
