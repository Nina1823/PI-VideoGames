import React, { useEffect, useState } from "react"; //se levante lo que quiero hacer, state: para que hacer uso del estado global
import Estilo from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todosGeneros, todosJuegos, filtradoGenero } from "../../Redux/actions/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Error from "../Error/Error";

const Home = () => {
    const dispatch = useDispatch(); //inv
    //Todos estos son los estados de...
    const error = useSelector(state => state.error)
    const videojuegos = useSelector(state => state.videoJuegos)
    const estadoGenero = useSelector(state => state.generos)// el estado del reducer
    const [seleccionGenero, setSeleccionGenero] = useState({ genero: [], existente: [] }); // para que se almacene el filtrado del usuario(lo que seleccionó y se deshabilite)
    let deshabilitadorSelec = !!seleccionGenero.genero.length; // si ya seleccionó un genero se vuelve true, y ya disable
    
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
        if(event.target.value==="todos"){
            dispatch(todosJuegos()) 
        }else{
            event.preventDefault()
            dispatch(filtradoGenero(event.target.value))
            setSeleccionGenero({...seleccionGenero,genero: [event.target.value]})
        }
     }
     const eliminarGenero = (event)=>{
        event.preventDefault();
        setSeleccionGenero({genero:[], existente:[] }) //me vacia el estado local, lo de la x
        dispatch(todosJuegos())

     }
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
                <select defaultValue="titulo" onChange={event => manejadorFiltradoGen(event)} disabled={deshabilitadorSelec}>
                    <option value="titulo" disabled> Generos</option>
                    <option value="todos">Todos</option>

                    {
                        estadoGenero.map((gen) => {
                            return <option key={gen.id} value={gen.nombre}>{gen.nombre[0].toUpperCase() + gen.nombre.slice(1)}</option>
                        })
                    }

                </select>
                {
                    
                    seleccionGenero.genero?.map((genero,index)=>{
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