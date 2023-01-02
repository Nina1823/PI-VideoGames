import axios from "axios";

export const TODOS_JUEGOS = "TODOS_JUEGOS";
export const BUSCAR_JUEGO ="BUSCAR_JUEGO";

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
export const cambiarError= ()=>{
    return{
        type: ERROR,
        payload: false
        
    }
}
export const busquedaJuego = (nombre) =>{
    return async function(dispatch) {
        try {
            const respuesta = await axios.get(`/videogames?name=${nombre}`)
            const juego = respuesta.data;
            dispatch({type:BUSCAR_JUEGO, payload:juego })
        } catch (error) {
            dispatch({type: ERROR,payload: `No se encontró el Videojuego con el nombre ${nombre}`})
        }
    }
} 