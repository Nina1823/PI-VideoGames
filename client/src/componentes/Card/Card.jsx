import React from "react";
import Estilo from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = ({item}) => {
    return (
       <Link to={`/home/${item.id}`}> 
        <h2>
            {/*Para que la primera letra sea en mayuscula*/}
            {item.nombre[0].toUpperCase()+item.nombre.slice(1)} {/* slice arranca en posicion 1 */}
            
        </h2>
        <img src={item.imagen} alt={item.nombre} />
        {
            item.generos.map(gen=>{
                return(
                    <div key={gen.id}>{gen.nombre[0].toUpperCase()+gen.nombre.slice(1)}</div>
                )

            })

        }
       </Link>
    )
}

export default Card;