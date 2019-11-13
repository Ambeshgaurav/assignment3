var express                     = require('express');
var app                         =express();
const router                    =express.Router();



const login=require('../controller/Admincontroller')
const validator=require('../validation/validator')
router.post('/login',validator.task.loginValidator,login.tasks.AdminGetDataLogin);
router.post('/signup',validator.task.signupValidatorAdmin,login.tasks.AdminGetDataSignup);
router.get('/findAllCustomer',login.tasks.CustomerDetails);
router.get('/findAllSP',login.tasks.SPDetails);
// router.post('/logout',validator.task.login_validator,login.tasks.get_data_login);


   
module.exports=router;