import React, { useEffect, useState } from "react"; //se levante lo que quiero hacer, state: para que hacer uso del estado global
import Estilo from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todosJuegos } from "../../Redux/actions/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Error from "../Error/Error";

const Home = () => {
    const dispatch = useDispatch(); //inv
    const error = useSelector(state => state.error)
    const videojuegos = useSelector(state => state.videoJuegos)

    useEffect(() => {
        if (videojuegos.length) {
        } else { //sino hay nah
            dispatch(todosJuegos())
        }
    },
        [dispatch, videojuegos.length]//solo verfiica los dos
    )
    if (error) { // el estado que tiene errores esta vacio
        return (
            <>
                <Error></Error>
            </>
        )
    } else if (videojuegos.length) {
        return (
            <div>
                <NavBar />
                <div>
                    {
                        videojuegos.map(juego => {
                            return <Card key={juego.id}
                                item={juego}
                            />
                        })
                    }
                </div>
            </div>
        )
    } else { //sino hay nah en videogames
        return (
            <>
                <NavBar />
                <div><h1>Cargando</h1></div>
            </>
        )
    }
}










export default Home;
//ESTO SOLO ES PARA COMPONENTES DE CLASE
// //Me trae el estado global y me lo lleva a las props
// const mapStateToProps = (state) => { //me trae el estado global
//     return {
//         videoJuegos: state.videoJuegos // una var normi: y le lleva la info a las props de mi componente
//     }
// }

// //enviar un paquete de var que hacen dispatch, esta fn que retorna mis funciones qure mira las videojuegos
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // fn que hace dispatch :
//         getVideoJuegos: () => dispatch(todos_Juegos())
//     }
// }
// //conclusion, agarro estado global y mando a props, agarro fn y las mando a props
// export default connect(mapStateToProps, mapDispatchToProps)(Home)