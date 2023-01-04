import React, { useState, useEffect } from "react";
import Estilo from "./Formulario.module.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { todosJuegos, todosGeneros, busquedaJuego, cambiarError, crearjuego, cambiarJuego } from "../../Redux/actions/actions";
import Home from "../Home/Home";

const Formulario = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const encontrarJuego = useSelector(state => state.videoJuegos);
    const [cargando, setCargando] = useState("");
    const [errores, setErrores] = useState({});
    const generos = useSelector(state => state.generos);
    const [input, setInput] = useState({
        "nombre": "",
        "descripcion": "",
        "lanzamiento": "",
        "calificacion": "",
        "plataformas": [],
        "imagen": "",
        "generos": []
    })

    useEffect(() => {
        dispatch(todosGeneros())
        dispatch(cambiarJuego())
    }, [dispatch])

    const manejadorEnviar = (event) => {
        event.preventDefault();
        dispatch(crearjuego(input))
        alert("VideoJuego creado con éxito!")
        setInput({
            "nombre": "",
            "descripcion": "",
            "lanzamiento": "",
            "calificacion": "",
            "plataformas": [],
            "imagen": "",
            "generos": []
        })
        history.push("/home")
        dispatch(todosJuegos())
    }

    const manejadorCambios = async (event) => {
        setInput({
            ...input,
            // corresponde al input que se está escribiendo, traigame el dato
            [event.target.name]: event.target.value
        })
        if (event.target.name === "nombre") {
            await setCargando("cargando") //mientras cargando tenga algo escrito en su estado local se deshabilita enviar
            await dispatch(cambiarJuego()) //vaciar el arr donde estan todos los juegos estado global
            await dispatch(busquedaJuego(event.target.value.toLowerCase())) //empieza  abuscar con lo que escriba y todo lo pasa a min
            await dispatch(cambiarError(false)) //no quiero que salga error  
            await setCargando("") //valio el estado local
        }
    }
    const manejadorSelecciones = (event) => {
        if (event.target.name === "generos") { //si el disparado del evento tiene genero

            if (!input.generos.includes(event.target.value)) { //no seleccione dos veces lo mismo
                setInput({ //modifique el local, pero en genero, me guarda la primera seleccion y tambien lo que seleccione despues
                    ...input,
                    generos: [...input.generos, event.target.value]
                })
            }
        }
        if (event.target.name === "plataformas") {
            if (input.plataformas.includes(event.target.value))
                setInput({
                    ...input,
                    plataformas: [...input.plataformas.event.target.value]

                })
        }
    }
    //cuando el usuario quiera desmarcar, tons filtra todos los juegos el que qquiere borrar
    //lo que seleccinó un genero, este se almacena en el local, cuando lo desmarque, quiero que tambien se me borre del local
    const manejarEliminarGenero = (event) => {
        event.preventDefault();
        let nuevoGenero = input.generos.filter((genero) => genero !== event.target.name)
        setInput({
            ...input,
            generos: nuevoGenero
        })
    }

    const manejadorEliminarPlataformas = (event) => {
        event.preventDefault();
        let nuevoPlataforma = input.plataformas.filter((plataforma) => plataforma !== event.target.name)
        setInput({
            ...input,
            plataformas: nuevoPlataforma
        })
    }
    return (
        <div>
            <NavLink to ="/home"><button>Regresar</button></NavLink>
            <form onSubmit={event=>manejadorEnviar(event)}>
                <div>
                    <label htmlFor="nombre">Nombre: <span>*</span></label> 
                    <input type="text" value={input.nombre} name='nombre' autoComplete="off" onChange={(event)=>manejadorCambios(event)} placeholder="Nombre"></input>
                {
                    cargando==="cargando" && (<p>Cargando...</p>)
                }
                { //si ahy algo en lo primero, se ejecuta lo despjes del &&
                //se ejecuta solo cuando hyaescrito algo
                    encontrarJuego.length && input.nombre.length?(<p>Éste juego ya existe</p>) : false
                }
                    </div>
                <div>
                    <label htmlFor="descripcion">Descripción:<span>*</span> </label>
                    <textarea  rows="1" cols="30" value={input.descripcion} name="descripcion" autoComplete="off" onChange={(event)=>manejadorCambios(event)} placeholder="Descripción"></textarea>
                </div>  

                <div>
                    <label htmlFor="lanzamiento">Lanzamiento:</label>
                    <input type="date" min="1960-01-01" max="2024-01-01" value={input.lanzamiento} name= 'lanzamiento'   autoComplete="off" onChange={(event)=>manejadorCambios(event)} placeholder="Lanzamiento"/>
                </div>  

                
            </form>
        </div>
    )
}

export default Formulario;