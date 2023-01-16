import React, { useState, useEffect } from "react";
import Estilo from "./Formulario.module.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { todosJuegos, todosGeneros, busquedaJuego, cambiarError, crearjuego, cambiarJuego } from "../../Redux/actions/actions";
import Home from "../Home/Home";

const validacion = (input) => {
    let errores = {};
    if (input.nombre.length < 3) {
        errores.nombre = "El nombre del videojuego debe ser superior a 3 caracteres"
    }
    if (input.descripcion.length < 5) {
        errores.descripcion = "La descripción del videojuego debe ser superior a 5 caracteres"
    }
    if (input.plataformas.length < 1) {
        errores.plataformas = "Debe de ingresar la plataforma a la que pertence el videojuego"
    }
    if (parseInt(input.lanzamiento) < 1960 || parseInt(input.lanzamiento) > 2024) {
        errores.lanzamiento = "El año debe de estar entre 1960 - 2024"
    }
    if (parseFloat(input.calificacion) < 0.01 || parseFloat(input.calificacion) > 5) {
        errores.calificacion = "Ingrese una calificacion que esté entre  0.01 y  5"
    }
    if (input.imagen.length > 0 && !(/\S+\.\S+/).test(input.imagen)) { //que hayan letras un . letras .test revisa el val
        errores.imagen = "Ingrese una URL valida"
    }
    return errores;
}


const Formulario = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const encontrarJuego = useSelector(state => state.videoJuegos);
    const [cargando, setCargando] = useState("");
    const [errores, setErrores] = useState({});
    const [aggPlataformas, setAggPlataformas] = useState("") //lo que coloque en el input, cuando le de en + se me guarde en el estado local,
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
        setErrores(validacion({
            ...input,
            [event.target.name]: event.target.value //cada que haga un cambio en el form, ademas que cambie el local, hace las validaciones, aparecen mientras escribe 
        }))
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
            event.preventDefault()
            if (!input.plataformas.includes(aggPlataformas)) { //lo mismo de arriba 
                setInput({
                    ...input,
                    plataformas: [...input.plataformas, aggPlataformas]

                })
                setAggPlataformas("")
                setErrores(validacion({
                    ...input,
                    plataformas: [...input.plataformas, aggPlataformas]

                }))

            }
        }
    }
    const manejadorPlataforma = (event) => {
        setAggPlataformas(event.target.value)
    }
    //cuando el usuario quiera desmarcar, tons filtra todos los juegos el que qquiere borrar
    //lo que seleccinó un genero, este se almacena en el local, cuando lo desmarque, quiero que tambien se me borre del local
    const manejadorEliminarGenero = (event) => {
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
            plataformas: nuevoPlataforma,

        })
        setErrores(validacion({
            ...input,
            plataformas: nuevoPlataforma,

        }))
    }
    let deshabilitadorbtn = !(input.nombre.length) || !(input.descripcion.length) || !(input.plataformas.length) || (errores.nombre || errores.descripcion || errores.lanzamiento || errores.calificacion || errores.plataformas || errores.imagen) // campos que no puede estar vaciosi esta vacio es false tons por eso negacion
    return (
        <div className={Estilo.todo}>
            <div className={Estilo.form}>

                <br />
                <NavLink to="/home"><button className={Estilo.btnRegresar}>← Regresar</button></NavLink>
                <div className={Estilo.contenidoForm}>
                    <form onSubmit={event => manejadorEnviar(event)} className={Estilo.formulario} >
                        <div>
                            <label className={Estilo.title}><b>FORMULARIO</b></label><br /><br /><br/>
                            <label className={Estilo.label} htmlFor="nombre">Nombre: <span className={Estilo.obligatorio}>*</span></label>
                            <input className={Estilo.label} type="text" value={input.nombre} name='nombre' autoComplete="off" onChange={(event) => manejadorCambios(event)} placeholder="Nombre"></input>
                            {
                                errores.nombre && (<p>{errores.nombre}</p>)
                            }
                            {
                                cargando === "cargando" && (<p>Cargando...</p>)
                            }
                            { //si ahy algo en lo primero, se ejecuta lo despjes del &&
                                //se ejecuta solo cuando hyaescrito algo
                                encontrarJuego.length && input.nombre.length ? (<p>Éste juego ya existe</p>) : false
                            }
                        </div>
                        <br />
                        <div>
                            <label htmlFor="descripcion">Descripción:<span className={Estilo.obligatorio}>*</span> </label>
                            <textarea rows="1" cols="30" value={input.descripcion} name="descripcion" autoComplete="off" onChange={(event) => manejadorCambios(event)} placeholder="Descripción"></textarea>
                            {
                                errores.descripcion && (<p>{errores.descripcion}</p>)
                            }
                        </div>
                        <br />
                        <div>
                            <label htmlFor="lanzamiento">Lanzamiento:</label>
                            <input type="date" min="1960-01-01" max="2024-01-01" value={input.lanzamiento} name='lanzamiento' autoComplete="off" onChange={(event) => manejadorCambios(event)} placeholder="Lanzamiento" />
                            {
                                errores.lanzamiento && (<p>{errores.lanzamiento}</p>)
                            }
                        </div>

                        <br />
                        <div>
                            <label htmlFor="calificacion">Calificación:</label>
                            <input type="number" step="0.01" min="0.01" max="5" value={input.calificacion} name='calificacion' onChange={(event) => manejadorCambios(event)} placeholder="0,01" />
                            {
                                errores.calificacion && (<p>{errores.calificacion}</p>)
                            }
                        </div>

                        <br />
                        <div >
                            <label htmlFor="plataformas">Plataformas: <span className={Estilo.obligatorio}>*</span></label>
                            <input type="text" onChange={(event) => manejadorPlataforma(event)} placeholder="Plataforma" value={aggPlataformas} className={Estilo.input} />
                            <button name="plataformas" onClick={(event) => manejadorSelecciones(event)}>+</button>
                            {
                                input.plataformas?.map((plataforma, index) => {
                                    return (
                                        <div key={index}><span key={plataforma}>{plataforma}</span><button name={plataforma} onClick={(event) => manejadorEliminarPlataformas(event)}>X</button></div>
                                    )
                                })
                            }
                            {
                                errores.plataformas && (<p>{errores.plataformas}</p>)
                            }
                        </div>
                        <br />
                        <div>
                            <label htmlFor="imagen">Imagen: </label>
                            <input type="url" name="imagen" value={input.imagen} onChange={(event) => manejadorCambios(event)} placeholder="https://example.com" className={Estilo.input} />
                            {
                                errores.imagen && (<p>{errores.imagen}</p>)
                            }
                        </div>

                        <br />
                        <div>
                            <label htmlFor="generos">Generos: </label>
                            <select name="generos" onChange={(event) => manejadorSelecciones(event)} placeholder="Seleccione genero" defaultValue="titulo" className={Estilo.select}>
                                <option value="titulo" disabled name="generos">Generos</option>
                                {
                                    generos.map((genero) => {
                                        return (
                                            <option value={genero.nombre} key={genero.id}>{genero.nombre[0].toUpperCase() + genero.nombre.slice(1)}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                input.generos?.map((genero, index) => {
                                    return (
                                        <div key={index} ><span key={genero}>{genero[0].toUpperCase() + genero.slice(1)}</span>
                                            <button name={genero} onClick={(event) => manejadorEliminarGenero(event)}>X</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br />
                        <button type="submit" className={Estilo.btnEnviar} disabled={deshabilitadorbtn}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario;
