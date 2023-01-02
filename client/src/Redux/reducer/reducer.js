import { TODOS_JUEGOS, ERROR } from "../actions/actions";
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
        default:
            return { ...state };
    }
}

export default rootReducer;