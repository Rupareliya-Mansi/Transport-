const router = require("express").Router();
const { protect } = require("../middelware/auth");
const {
    addcustomer,
    signin,
    change_password,
    forgot_password,
    conformationOTP,
    forgotchange_password,

} = require("../controller/customer_info");
// const { body, validationResult } = require("express-validator");
router.post("/addcustomer",addcustomer); 
router.post("/signin",signin); 
router.put("/change_password",change_password); 
router.put("/forgot_password/",forgot_password); 
router.put("/conformationOTP",conformationOTP); 
router.put("/forgotchange_password",forgotchange_password); 





module.exports = router;