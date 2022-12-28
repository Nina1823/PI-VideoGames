const { Router } = require('express');// instancia de lo que tengo en express
const RutasVideoGames = require ("./RutasVideoGames/RutasVideoJuegos");
const RutasGeneros = require ("./RutasGeneros/RutasGeneros");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/",(req,res)=>{
    return res.status(200).send("Bienvenido al api");
});



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",RutasVideoGames);
router.use("/genres",RutasGeneros);


module.exports = router;
