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
        //primera pregunta
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
                    "nombre": genero.name.toLowerCase()
                }))
                return resultGen;
            }
            necesario.push({
                "id": juego.id,
                "nombre": juego.name.toLowerCase(),
                "imagen": juego.background_image,
                "generos": encontrarGeneros(),
                "calificacion": juego.rating// por ordamiento ene l front
            })
        })
        if (name) {

            info = necesario.filter(juego => juego.nombre === name.toLowerCase())
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
        let filtrado =[];
        let infoJuego = [];
        if (id.length > 6) { //corresponde a los id de la bd
        } else {
            id = parseInt(id)
        }
        //filtrado del videogame exista dentro de los primeros 100
        filtrado = todosJuego.filter( (juego) => juego.id === id )
        if (filtrado.length) {
            if(id.length>6){
                return filtrado;
            }
            let infoApi = await axios.get(url + "/" + id + "?key=" + API);

            function encontrarGeneros() {
                let resultGen = [];
                infoApi.data.genres.map((genero) => resultGen.push({
                    "id": genero.id,
                    "nombre": genero.name
                }))
                return resultGen;
            }

            function encontrarPlataforma() {
                let resulPlataforma = [];
                infoApi.data.platforms.map((plataforma) => resulPlataforma.push({
                    "id": plataforma.platform.id,
                    "nombre": plataforma.platform.name
                }))
                return resulPlataforma;
            }

            let infoId = {
                "id": infoApi.data.id,
                "nombre": infoApi.data.name,
                "descripcion": infoApi.data.description,
                "generos": encontrarGeneros(),
                "lanzamiento": infoApi.data.released,
                "calificacion": infoApi.data.rating,
                "plataformas": encontrarPlataforma(),
                "imagen": infoApi.data.background_image
            }
            infoJuego.push(infoId);
            return infoJuego;
        } else {
            throw new Error("No existe el videojuego con id :  " + id)
        }
    },

    crearNuevoJuego: async function(nuevo){
        const { nombre, descripcion, lanzamiento, calificacion, plataformas, imagen,generos } = nuevo;
        //no me pasan algo cali
        nuevo.calificacion ? nuevo.calificacion = parseFloat(calificacion): nuevo.calificacion = 0.0
        if(imagen.length === 0){ //sino me pasan img le ponemos esta x2
            nuevo.imagen = "https://www.curn.edu.co/images/ZARINA.jpg"; 
        }
        if(!nombre || !descripcion || !plataformas){ //destruc para poder usar aqui
            throw new Error("No se puede crear videoJuego, ingresar los datos faltantes")
        }else{
            const crearJuego = await Videogame.create(nuevo)
            if(generos){
                generos.forEach(async genero=>{ //genres el que mandan por body
                    let todosGenerosTabla= await Genero.findAll()
                    
                    //me busca le id en la tabla de genero y me lo compara con el del id body gnres, si su respuesta coinside, 
                    //me llena la tabla intermedia 
                    todosGenerosTabla.find((gen) => gen.nombre == genero ? crearJuego.addGeneros(gen.id): false) 
                })
            }
        return ("¡ Se creó tu juego con éxito !")
        }
    }
}


