import React from "react";
import Estilo from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = ({item}) => {
    return (
       <Link to={`/home/${item.id}`}> 
        <h2>
            {item.nombre}
        </h2>
        <img src={item.imagen} alt={item.nombre} />
        {
            item.generos.map(gen=>{
                return(
                    <div key={gen.id}>{gen.nombre}</div>
                )

            })
        }
       </Link>
    )
}

export default Card;