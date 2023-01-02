import React from "react";
import Estilo from "./Error.module.css";
import { useDispatch, useSelect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { todosJuegos, cambiarError } from "../../Redux/actions/actions";

const Error = () => {
    const error = useSelector(state => state.error)
    const dispatch = useDispatch();
    const history = useHistory(); //navegar entre el historial del nav para retroceder o avanzar segun lo reciente 
    const submitHandler = (event) => {
        history.push("/home")
        event.preventDefault(); //no redirecciona, eta en el home y no me lleva a otra pagina 
        dispatch(todosJuegos());
        dispatch(cambiarError())
    }
    return (
        <div>
            <h1>Algo salió mal :c</h1>
            <span>{error}</span>
            <button onClick={(event) => submitHandler(event)}>Regresar</button>
        </div>
    )
}

export default Error;