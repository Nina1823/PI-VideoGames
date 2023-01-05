import { TODOS_JUEGOS, ERROR, BUSCAR_JUEGO, DETALLE_JUEGO, TODOS_GENEROS, FILTRADO_GENERO, FILTRADO_BD, FILTRADO_NOMBRE, FILTRADO_CALIFICACION } from "../actions/actions";
const initialState = {//GLOBAL
    videoJuegos: [], 
    error: "",
    detalleJuego: {},
    generos: [],
}

const rootReducer = (state = initialState, action) => {//maneja el estado global
    switch (action.type) { //type del titulo
        case TODOS_JUEGOS:
            return {
                ...state, //mantengo los cambios que ya haya tenido en el estado global
                videoJuegos: action.payload, //payload donde guardo la info
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        case BUSCAR_JUEGO:
            return {
                ...state,
                videoJuegos: action.payload //para que muestre en el mismo lugar
            }

        case DETALLE_JUEGO:
            return {
                ...state,
                detalleJuego: action.payload
            }

        case TODOS_GENEROS:
            return {
                ...state,
                generos: action.payload
            }
        case FILTRADO_GENERO:
            const todosJuegosFG = [...state.videoJuegos];
            let juegosPorGenero = [];
            todosJuegosFG.forEach((juego) => {
                juego.generos.forEach(genero => genero.nombre === action.payload ? juegosPorGenero.push(juego) : false
                )

            })
            return {
                ...state,
                videoJuegos: juegosPorGenero,
                error: juegosPorGenero.length > 0 ? false : `No existe ningun videojuego con el genero ${action.payload}` //si hay algo en el arr no haga nah
                // y sinó pos error
            }
        case FILTRADO_BD:
            const todosJuegosFDB = [...state.videoJuegos]; //filtrado por bd
            //: sino pide por los de la api, hacer un filtrado de los que no tienen la propiedad de createdInDb
            //: entonces me estan pidiendo por los de la api
            let juegosPorBd = action.payload === "creados" ? todosJuegosFDB.filter((juego) => juego.createdInDb) : todosJuegosFDB.filter((juego) => !juego.createdInDb) // ! que no tiene la propiedad createInDb

            return {
                ...state,
                videoJuegos: action.payload === "todos" ? todosJuegosFDB : juegosPorBd,
                error: juegosPorBd.length > 0 ? false : `No se han creado Videojuegos en la base de datos`
            }

        case FILTRADO_NOMBRE:
            const todosJuegosFN = [...state.videoJuegos];
            const filtradoNombre = action.payload === "ascendente" ? todosJuegosFN.sort((a, b) => {
                if (a.nombre > b.nombre) {
                    return 1; //la posi
                }
                if (b.nombre > a.nombre) {
                    return -1
                }
                return 0 //si son = no se cambia

            }) : todosJuegosFN.sort((a, b) => { //ya que es descendente 
                if (a.nombre > b.nombre) {
                    return -1;
                }
                if (b.nombre > a.nombre) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                videoJuegos: filtradoNombre
            }
        case FILTRADO_CALIFICACION:
            const todosJuegoFR = [...state.videoJuegos];
            const filtradoCalificacion = action.payload === "mejor" ? todosJuegoFR.sort((a, b) => {
                if (a.calificacion > b.calificacion) {
                    return -1;
                }
                if (b.calificacion > a.calificacion) {
                    return 1;
                }
                return 0;
            }) : todosJuegoFR.sort((a, b) => {
                if (a.calificacion > b.calificacion) {
                    return 1;
                }
                if (b.calificacion > a.calificacion) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state, 
                videoJuegos: filtradoCalificacion
            }

        default:
            return { ...state };
    }
}

export default rootReducer;