var express                     = require('express');
var app                         =express();
const router                    =express.Router();


const login=require('../controller/customercontroller')
const validator=require('./validation')


router.post('/login',validator.task.loginValidator,login.tasks.CustomerGetDataLogin);
router.post('/signup',validator.task.signupValidator,login.tasks.CustomerGetDataSignup);
router.put('/updateprofile',login.tasks.UpdateProfile);
router.post('/findSP',login.tasks.SPLocation)
// router.post('/logout',validator.task.login_validator,login.tasks.get_data_login);





module.exports=router;