import React from "react";
import Estilo from "./NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { busquedaJuego, todosJuegos } from "../../Redux/actions/actions";

const NavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [nombre, setNombre] = useState("")
    const changeHandler = (event) => {
        const dato = event.target.value // se me copia el valor del que esta buscando
        setNombre(dato)

    }
    const submitHandler = (event) => {
        dispatch(busquedaJuego(nombre))
    }

    const recargarComponente = (event) => {
        history.push("/home");
        event.preventDefault();
        dispatch(todosJuegos());
        setNombre("");
    }
    return (
        <div>
            <NavLink to="/">
                <h4>Landing</h4>
            </NavLink>

            <input type="text" id="nombre" autoComplete="off" value={nombre} onChange={event => changeHandler(event)} placeholder="Buscar Videojuego..." />
            <button onClick={(event) => submitHandler(event)}>Buscar</button>

            <NavLink to="/formulario">
                <h3>Formulario</h3>
            </NavLink>

            <button onClick={(event) => recargarComponente(event)}>Recargar</button>
        </div>
        //filtrado--home
        //formulario
        //detalle 
        //paginado

    )
}

export default NavBar;