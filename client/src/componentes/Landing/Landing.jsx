import React from "react";
import Estilo from "./Landing.module.css"
import { Link } from "react-router-dom";
const Landing = () => {

    return (
        <div className={Estilo.info}>
            <br/>
           
            <Link to="/home"><button className={Estilo.btnHome}>¡ Iniciar aventura !</button></Link>
           <br />
           <div className={Estilo.divInfo}>
            <h2 className={Estilo.contenido}>En esta página descubriras la información de multiples videojuegos
                donde podras encontrar cada una de sus caracteristicas e incluso clasificarlos 
                por mejor / peor y así encontraras el ideal para ti
            </h2>
           </div>
            
        
  
        </div>
    )
}

export default Landing