import React, { useEffect } from "react";
import Estilo from "./Detalle.module.css"
import { useDispatch, useSelector } from "react-redux";
import { todosJuegos, detalleJuego } from "../../Redux/actions/actions";
import { NavLink, useHistory } from "react-router-dom";
import Error from "../Error/Error";

const Detalle = (props) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const estadoDetalle = useSelector(state => state.detalleJuego);
    const history = useHistory();
    const idJuego = props.match.params.id;//match apuntador creoooo
    useEffect(() => {
        dispatch(detalleJuego(idJuego))
    },
        [dispatch, idJuego] //lo que quiero que valide que se eejcute, obligatorio pa que se renderice bien 
    )
    if (error) {
        return <Error></Error>
    } else if (estadoDetalle.hasOwnProperty('id') && (estadoDetalle.id === parseInt(idJuego) || estadoDetalle.id === idJuego)) {
        return (
            <div>
                <NavLink to="/home">Home</NavLink>
                <img src={estadoDetalle.imagen} alt={estadoDetalle.nombre}/>
                <span><b>Nombre:</b> {estadoDetalle.nombre}</span>
                <h3>Descripción:</h3><p dangerouslySetInnerHTML={{__html: estadoDetalle.descripcion}}/>
                <span><b>Fecha Lanzamiento:</b> {estadoDetalle.lanzamiento}</span>
                <span><b>Calificación:</b> {estadoDetalle.calificacion}</span>
                <span><b>Plataformas:</b>{estadoDetalle.plataformas.map((plataforma)=>{
                    return (
                        <div key={plataforma.id}>{plataforma.nombre} </div>
                    )
                })}</span>
                <span>Generos: {estadoDetalle.generos.map((genero)=>{
                    return(
                        <div key={genero.id}>{genero.nombre}</div>
                    )
                })}</span>
                
            </div>
        )
    } else {
        return (<h3>Cargando</h3>)
    }

}
export default Detalle