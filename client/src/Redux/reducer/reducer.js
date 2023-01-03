import { TODOS_JUEGOS, ERROR, BUSCAR_JUEGO, DETALLE_JUEGO, TODOS_GENEROS, FILTRADO_GENERO } from "../actions/actions";
const initialState = {
    videoJuegos: [],
    error: "",
    detalleJuego: {},
    generos: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TODOS_JUEGOS:
            return {
                ...state,
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
                juego.generos.forEach(genero =>genero.nombre === action.payload ? juegosPorGenero.push(juego) : false
                )
               
            })
            return {
                ...state,
                videoJuegos: juegosPorGenero,
                error: juegosPorGenero.length > 0 ? false : `No existe ningun videojuego con el genero ${action.payload}` //si hay algo en el arr no haga nah
                // y sinó pos error
            }

        default:
            return { ...state };
    }
}

export default rootReducer;