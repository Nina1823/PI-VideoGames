const {Router} = require("express");
const router = Router();


router.get("/",(req,res)=>{
    try {
       return res.status(200).send("Me trae los generos");
    } catch (error) {
        res.status(404).json({error: error.message})
    }
  
})
module.exports = router;