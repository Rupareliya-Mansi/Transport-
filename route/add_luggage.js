const router = require("express").Router();
const { protect } = require("../middelware/auth");
const {
    addLuggage,
    find_luggage,
    updateluggage,
    luggage_pegination,
    deleteluggage,
    Multiple_luggage_delete

} = require("../controller/add_luggage.");
// const { body, validationResult } = require("express-validator");
router.post("/addLuggage",protect,addLuggage); 
router.put("/updateluggage/:id",protect,updateluggage); 
router.get("/find_luggage/:id",protect,find_luggage);  
router.get("/luggage_pegination",luggage_pegination); 
router.delete("/deleteluggage/:id",deleteluggage);
router.delete("/Multiple_luggage_delete",Multiple_luggage_delete); 




module.exports = router;