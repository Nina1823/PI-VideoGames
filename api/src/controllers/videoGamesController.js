require('dotenv').config();//lee los env
const axios = require("axios");
const bodyParser = require('body-parser');
const { Videogame, Genero } = require("../db");
const { API } = process.env;
const url = "https://api.rawg.io/api/games";

module.exports = {
    TodosLosJuegos: async function (name) {
        let info = [];
        let resultadoApi = [];
        let necesario = [];
        let infoBd = await Videogame.findAll({ include: Genero })
        let infoApi = await axios.get(url + "?key=" + API);

        resultadoApi = [...infoApi.data.results];
        let siguieteUrl = infoApi.data.next;

        necesario = [...infoBd];
        for (let i = 0; i < 4; i++) {
            let siguienteRes = await axios.get(siguieteUrl);
            resultadoApi = [...resultadoApi, ...siguienteRes.data.results];
            siguieteUrl = siguienteRes.data.next;
        }
        resultadoApi.map((juego) => {

            function encontrarGeneros() {
                let resultGen = [];
                juego.genres.map((genero) => resultGen.push({
                    "id": genero.id,
                    "nombre": genero.name
                }))
                return resultGen;
            }
            necesario.push({
                "id": juego.id,
                "nombre": juego.name,
                "imagen": juego.background_image,
                "genero": encontrarGeneros()
            })
        })
        if (name) {

            info = necesario.filter(juego => juego.nombre === name)
            if (info.length > 0) {
                return info;
            } else {
                throw new Error("No existe el videojuego:  " + name)
            }
        } else {
            return necesario;
        }
    },

    busquedaPorId: async function (id) {
        let todosJuego = await this.TodosLosJuegos();
        let infoJuego = [];
        if (id.length > 6) { //corresponde a los id de la bd
        } else {
            id = parseInt(id)
        }
        //filtrado del videogame exista dentro de los primeros 100
        let filtrado = todosJuego.filter((juego) => juego.id === id
        )
        if (filtrado.length) {
            let infoApi = await axios.get(url + "/" + id + "?key=" + API);
            const infoId = {
                "nombre": infoApi.data.name,
                "imagen": infoApi.data.background_image,
                "genero": infoApi.data.genres,
                "lanzamiento": infoApi.data.released,
                "rating": infoApi.data.rating,
                "plataformas": infoApi.data.platform
            }
            infoJuego.push(infoId);
        }
        return infoJuego;
    },
        
    // crearNuevoJuego: async function(nuevo){
    //     const { name, description, FechaLanzamiento, Rating, plataformas, img,genres } = nuevo;
    //     nuevo.Rating ? nuevo.Rating = parseFloat(Rating): nuevo.Rating = 0.0
    //     if(img.length === 0){ //sino me pasan img le ponemos esta x2
    //         nuevo.img = "https://www.curn.edu.co/images/ZARINA.jpg"; 
    //     }
    //     if(!name || !description || !plataformas){ //destruc para poder usar aqui
    //         throw new Error("No se puede crear videoJuego, ingresar los datos faltantes")
    //     }else{
    //         const crearJuego = await Videogame.create(nuevo)
    //     }
    // }


}


