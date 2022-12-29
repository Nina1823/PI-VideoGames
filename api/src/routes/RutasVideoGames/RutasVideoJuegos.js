const {Router} = require("express");
const router = Router();
const videoGamesController = require ("../../controllers/videoGamesController");

router.get("/", async (req,res)=>{
    const {name} = req.query;
  
    try {
        if(name){
            const resultado= await videoGamesController.TodosLosJuegos(name);
            return res.status(200).json(resultado);
        }else{
            const resultado = await videoGamesController.TodosLosJuegos();
            return res.status(200).json(resultado);
        }
    } catch (error) {
        res.status(404).json({error: error.message});
    }
})

router.get("/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        if(id){
            const resultado = await videoGamesController.busquedaPorId(id);
            return res.status(200).json(resultado);//json porque  tiene muchos obj, mas no un mensaje como para poner send
        }else{
            throw new Error("No se mandó id")
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.post("/", async (req,res)=>{
    const nuevo = req.body;
    try {
        const creacion = await videoGamesController.crearNuevoJuego(nuevo);
        res.status(200).send(creacion)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})


module.exports = router;
