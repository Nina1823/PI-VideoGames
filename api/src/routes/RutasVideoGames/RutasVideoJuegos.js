const {Router} = require("express");
const router = Router();
const videoGamesController = require ("../../controllers/videoGamesController");

router.get("/", async (req,res)=>{
    const {name} = req.query;
  
    try {
        if(name){
            return res.status(200).send("Me mandó name");
        }else{
            const resultado = await videoGamesController.TodosLosJuegos();
            return res.status(200).json(resultado);
        }
    } catch (error) {
        res.status(404).json({error: error.message});
    }
})

router.get("/:id",(req,res)=>{
    const {id}= req.params;
    try {
        if(id){
            return res.status(200).send("Me mandaron id");
        }else{
            throw new Error("No se mandó id")
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

// router.post("/",(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })


module.exports = router;
