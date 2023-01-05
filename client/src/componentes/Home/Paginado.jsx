import React from "react";
import Estilo from "./Paginado.module.css"

const Paginado = ({ juegosPorPagina, paginaActual, videojuegos, paginado }) => {
    const numeroPaginas = [];
    for (let i = 1; i <= Math.ceil(videojuegos / juegosPorPagina); i++) {// la cant de paginas que hay
        numeroPaginas.push(i)
    }
    return (
        <nav>
            <div className={Estilo.ul}>{
                paginaActual > 1 && <li className={Estilo.liNumber}> <span className={Estilo.paginado} onClick={() => paginado(--paginaActual)}>Anterior</span></li>
            }
                {
                    numeroPaginas && numeroPaginas.map((numero) => { 
                        return (
                            <div className={Estilo.Numeroli} key={numero}>
                                <span className={Estilo.paginado} onClick={() => paginado(numero)}> {numero}</span>
                            </div>
                        )
                    })
                    
                }
                {
                    paginaActual < numeroPaginas.length && <li className={Estilo.liNumber}><span className={Estilo.paginado} onClick={()=>paginado(++paginaActual)}>Siguiente</span></li>
                }

            </div>
        </nav>
    )
}
export default Paginado;