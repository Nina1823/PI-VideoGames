import axios from "axios";

export const TODOS_JUEGOS = "TODOS_JUEGOS";
export const BUSCAR_JUEGO ="BUSCAR_JUEGO";
export const DETALLE_JUEGO = "DETALLE_JUEGO";
export const ERROR = "ERROR";
export const FILTRADO_GENERO = "FILTRADO_GENERO";
export const TODOS_GENEROS = "TODOS_GENEROS";


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

export const todosGeneros = () =>{
    return async function (dispatch){
        try {
            const respuesta = await axios.get("/genres");
            const generos = respuesta.data;
            dispatch({type: TODOS_GENEROS, payload: generos})
        } catch (error) {
            dispatch({type: ERROR, payload: error.message})
        }
    };
}

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
            dispatch({type: ERROR,payload: `No encontramos el Videojuego con el nombre ${nombre}`})
        }
    }
} 
export const detalleJuego = (id) => {
    return async function(dispatch){
        try {
            const respuesta = await axios.get(`/videogames/${id}`)
            const detalleJuego =respuesta.data.pop();//guardar el juego 
            dispatch({type:DETALLE_JUEGO, payload:detalleJuego})
        } catch (error) {
            dispatch({type:ERROR, payload: `No encontramos el Videojuego con el id ${id}`})
        }
    }

}

export const filtradoGenero = (payload) =>{ // lo que recibo del home, lo que solicita el cliente
    return {
        type:FILTRADO_GENERO, payload //toma lo que le mandan por parametro 
    }
}
