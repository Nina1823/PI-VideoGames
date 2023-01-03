import React from "react";
import Estilo from "./Paginado.module.css"

const Paginado = ({ juegosPorPagina, paginaActual, videojuegos, paginado }) => {
    const numeroPaginas = [];
    for (let i = 1; i <= Math.ceil(videojuegos / juegosPorPagina); i++) {
        numeroPaginas.push(i)
    }
    return (
        <nav>
            <ul>{
                paginaActual > 1 && <li> <spa onClick={() => paginado(--paginaActual)}>Anterior</spa></li>
            }
                {
                    numeroPaginas && numeroPaginas.map((numero) => {
                        return (
                            <li key={numero}>
                                <span onClick={() => paginado(numero)}> {numero}</span>
                            </li>
                        )
                    })
                    
                }
                {
                    paginaActual < numeroPaginas.length && <li><span onClick={()=>paginado(++paginaActual)}>Siguiente</span></li>
                }

            </ul>
        </nav>
    )
}
export default Paginado;