require('dotenv').config();//lee los env
const axios = require("axios");
const { Videogame, Genero } = require("../db");
const { API } = process.env;
const url = "https://api.rawg.io/api/games";

module.exports = {
    TodosLosJuegos: async function (name) {
        let info = [];
        let resultadoApi=[];
        let necesario=[];
        let infoBd = await Videogame.findAll({ include: Genero })
        let infoApi = await axios.get(url + "?key=" + API);
        
        resultadoApi=[...infoApi.data.results];
        let siguieteUrl = infoApi.data.next;

        for(let i=0;i<4;i++){
            let siguienteRes= await axios.get(siguieteUrl);
            resultadoApi=[...resultadoApi,...siguienteRes.data.results];
            siguieteUrl=siguienteRes.data.next;           
        }
        resultadoApi.map((juego)=>{

            function encontrarGeneros(){
                let resultGen=[];
                juego.genres.map((genero)=>resultGen.push({
                    "id": genero.id,
                    "nombre":genero.name
                }))
                return resultGen;
            }
            necesario.push({
                "id":juego.id,
                "nombre":juego.name,
                "imagen":juego.background_image,
                "genero": encontrarGeneros()
            })
        })
        return necesario;

    }

}