import React, { useEffect, useState } from "react"; //se levante lo que quiero hacer, state: para que hacer uso del estado global
import Estilo from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todosGeneros, todosJuegos, filtradoGenero, filtradoBd, filtradoCalificacion, filtradoNombre } from "../../Redux/actions/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Error from "../Error/Error";
import Paginado from "./Paginado";

const Home = () => {
    const dispatch = useDispatch(); //inv

    const error = useSelector(state => state.error)
    const videojuegos = useSelector(state => state.videoJuegos)
    const estadoGenero = useSelector(state => state.generos)// el estado del reducer
    const [seleccionGenero, setSeleccionGenero] = useState({ genero: [], existente: [] }); // para que se almacene el filtrado del usuario(lo que seleccionó y se deshabilite)
    const [orden, setOrden] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const juegosPorPagina = 15;
    const ultimoJuego = paginaActual * juegosPorPagina;
    const primerJuego = ultimoJuego - juegosPorPagina;
    const juegosActuales = videojuegos.slice(primerJuego, ultimoJuego) //por cada pagina muestra desde el 1ero y ultimo que haya por pagina
    const paginado = (numeroPagina) => {
        setPaginaActual(numeroPagina)
    }
    let deshabilitadorSelec = !!seleccionGenero.genero.length; // si ya seleccionó un genero se vuelve true, y ya disable
    let deshabilitarOrigen = !!seleccionGenero.existente.length; //lleno true nada false

    useEffect(() => {
        if (videojuegos.length) {
        } else { //sino hay nah
            dispatch(todosJuegos());
            dispatch(todosGeneros());
        }
    },
        [dispatch, videojuegos.length]//solo verfiica los dos
    )
    const manejadorFiltradoGen = (event) => {
        if (event.target.value === "todos") {
            dispatch(todosJuegos())

        } else {
            event.preventDefault()
            dispatch(filtradoGenero(event.target.value))
            setSeleccionGenero({ ...seleccionGenero, genero: [event.target.value] }) //modiifco genero
        }
        setPaginaActual(1) //   que no solo me filtre por la pagina, sino por los 100 
    }
    const manejadorFiltradoBd = (event) => {
        event.preventDefault()
        dispatch(filtradoBd(event.target.value)) //eveneto, dispara el eveneto, valor que se seleccionó en el select (onChange)  creados/api/orgien
        setSeleccionGenero({ ...seleccionGenero, existente: [event.target.value] })
        setPaginaActual(1)

    }

    const eliminarGenero = (event) => {
        event.preventDefault();
        setSeleccionGenero({ genero: [], existente: [] }) //me vacia el estado local, lo de la x
        dispatch(todosJuegos())

    }

    const manejadorOrden = (event) => {
        event.preventDefault();
        let valor = event.target.value;
        if (valor === "ascendente" || valor === "descendente") {
            dispatch(filtradoNombre(valor))
            setPaginaActual(1) //   que no solo me ordene por la pagina, sino por los 100 juegos
            setOrden(`ordenado${valor}`)
        }
        if (valor == "mejor" || valor === "peor") {
            dispatch(filtradoCalificacion(valor))
            setPaginaActual(1)
            setOrden(`ordenadoCalificacion ${valor}`)


        }
        if (valor === "aleatorio") {
            dispatch(todosJuegos())
            setPaginaActual(1)
            setOrden(`aleatorio`)


        }
    }
    if (error) { // el estado que tiene errores esta vacio
        return (
            <>
                <Error></Error>
            </>
        )
    } else if (videojuegos.length) {
        return (
            <div className={Estilo.nose}>
                <NavBar setPaginaActual={setPaginaActual} />
                <select className={Estilo.selectGen} defaultValue="titulo" onChange={event => manejadorFiltradoGen(event)} disabled={deshabilitadorSelec}>
                    <option value="titulo" disabled> Generos</option>
                    <option value="todos">Todos</option>

                    {
                        estadoGenero.map((gen) => {
                            return <option key={gen.id} value={gen.nombre}>{gen.nombre[0].toUpperCase() + gen.nombre.slice(1)}</option>
                        })
                    }

                </select >
                {

                    seleccionGenero.genero?.map((genero, index) => {
                        return (
                            <div key={index}>
                                <span key={genero}>
                                    {
                                        genero[0].toUpperCase() + genero.slice(1)
                                    }
                                </span>
                                <button name={genero} onClick={event => eliminarGenero(event)}>X</button>
                            </div>
                        )
                    })
                }
                <select className={Estilo.selectOrigen} defaultValue="titulo" onChange={event => manejadorFiltradoBd(event)} disabled={deshabilitarOrigen}>
                    <option value="titulo" disabled>Origen</option>
                    <option value="todos">Todos</option>
                    <option value="api">Api</option>
                    <option value="creados">Creados</option>
                </select>
                {
                    seleccionGenero.existente?.map((origen, index) => {
                        return (
                            <div key={index}>
                                <span key={origen}>
                                    {
                                        origen[0].toUpperCase() + origen.slice(1)
                                    }
                                </span>
                                <button name={origen} onClick={event => eliminarGenero(event)}>X</button>
                            </div>
                        )
                    })
                }

                <select className={Estilo.selectOrden} defaultValue="titulo" onChange={event => manejadorOrden(event)}>
                    <option value="titulo" disabled>Ordenar</option>
                    <option value="aleatorio">Aleatorio</option>
                    <option value="ascendente">Ascedente</option>
                    <option value="descendente">Descendente</option>
                    <option value="mejor">Mejor</option>
                    <option value="peor">Peor</option>
                </select>

                <div>
                    {
                        juegosActuales.map(juego => {
                            return <Card key={juego.id}
                                item={juego}
                            />
                        })
                    }
                </div>
                <Paginado className={Estilo.paginado} juegosPorPagina={juegosPorPagina} paginaActual={paginaActual} videojuegos={videojuegos.length} paginado={paginado} />

            </div>
        )
    } else { //sino hay nah en videogames
        return (
            <div className={Estilo.cargando}>
                <>
                    <NavBar />
                    <div ><h1>Cargando...</h1></div>

                </>
            </div>
        )
    }
}

export default Home;