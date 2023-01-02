import axios from "axios";

export const TODOS_JUEGOS = "TODOS_JUEGOS";
export const ERROR = "ERROR";
export const todosJuegos = () => {
    return async function (dispatch) {
        try {
            const respuesta = await axios.get("/videogames");
            const videojuegos = respuesta.data;
            dispatch({ type: TODOS_JUEGOS, payload: videojuegos })
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message })
        }
    };
};
