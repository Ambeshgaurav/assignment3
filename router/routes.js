var express                     = require('express');
var app                         =express();
const router                    =express.Router();


const login=require('../controller/controller')
const validator=require('../validation/validator')


router.post('/login',validator.task.loginValidator,login.tasks.CustomerGetDataLogin);
router.post('/signup',validator.task.signupValidator,login.tasks.CustomerGetDataSignup);
// router.post('/updateprofile',validator.task.login_validator,login.tasks.get_data_login);
// router.post('/logout',validator.task.login_validator,login.tasks.get_data_login);



module.exports=router;









