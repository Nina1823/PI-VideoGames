import { TODOS_JUEGOS, ERROR, BUSCAR_JUEGO } from "../actions/actions";
const initialState = {
    videoJuegos: [],
    error:"",
    
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
            return{
                ...state,
                videoJuegos:action.payload //para que muestre en el mismo lugar
                
            }
        
        default:
            return { ...state };
    }
}

export default rootReducer;