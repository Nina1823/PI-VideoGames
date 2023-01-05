import React from "react";
import Estilo from "./NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { busquedaJuego, todosJuegos } from "../../Redux/actions/actions";

const NavBar = ({setPaginaActual}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [nombre, setNombre] = useState("") //UseState estado local
    const changeHandler = (event) => {
        const dato = event.target.value // se me copia el valor del que esta buscando
        setNombre(dato)
    }
    const submitHandler = async(event) => {

        await dispatch(busquedaJuego(nombre))
        setPaginaActual(1)
    }

    const recargarComponente = (event) => {
        history.push("/home");
        event.preventDefault();
        dispatch(todosJuegos());
        setNombre("");
    }
    return (
        <div className={Estilo.navbar}>
            <NavLink to="/">
                <button className={Estilo.boton}>←Landing</button>
            </NavLink>
            <div>
                <input className={Estilo.inputBuscar} type="text" id="nombre" autoComplete="off" value={nombre} onChange={event => changeHandler(event)} placeholder="Buscar Videojuego..." />
                <button className={Estilo.boton} onClick={(event) => submitHandler(event)}>Buscar</button>
            </div>
            <div >
                <NavLink to="/formulario">
                    <button className={Estilo.boton}>Formulario</button>
                </NavLink>

                <button className={Estilo.boton} onClick={(event) => recargarComponente(event)}>
                    Recargar</button>
            </div>
        </div>

    )
}

export default NavBar;