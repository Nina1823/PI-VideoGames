require('dotenv').config();//lee los env
const axios = require("axios");
const {  Genero } = require("../db");
const { API } = process.env;
const url ="https://api.rawg.io/api/genres?key=38d8c9f40913477f9d90b528468c050f";

const traerId = async ()=>{
    const generos= await axios.get(url);
    let respuesta=[];
    generos.data.results.map(gen=>{

    })

}