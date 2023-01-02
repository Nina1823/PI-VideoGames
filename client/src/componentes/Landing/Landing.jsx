import React from "react";
import Estilo from "./Landing.module.css"
import { Link } from "react-router-dom";
const Landing = () => {

    return (
        <div>
            <h1>Estamos en Landing</h1>
            <Link to="/home">Home
            </Link>
        </div>
    )
}

export default Landing