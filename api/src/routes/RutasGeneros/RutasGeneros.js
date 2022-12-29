const {Router} = require("express");
const router = Router();
const generoController = require("../../controllers/generoController");

router.get("/",async(req,res)=>{
    try {
        const guardarGen= await generoController.guardarGenerosBd();
       return res.status(200).send(guardarGen);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
  
})
module.exports = router;