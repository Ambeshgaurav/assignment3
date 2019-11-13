var express                     = require('express');
var app                         =express();
const router                    =express.Router();


const login=require('../controller/SpController')
const validator=require('../validation/validator')
// console.log("-------gf");


router.post('/login',validator.task.loginValidator,login.tasks.SPGetDataLogin);
router.post('/signup',validator.task.signupValidator,login.tasks.SPGetDataSignup);
router.put('/updateprofile',login.tasks.UpdateProfile);
// router.get('/findSP',login.tasks.SPLocation)
// router.post('/logout',validator.task.login_validator,login.tasks.get_data_login);



module.exports=router;