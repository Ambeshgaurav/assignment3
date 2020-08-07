const control = require('../services/SpService')
const jwt1 = require('../auth/token')
const async = require("async");
// const hash = require("./hashing")
const bcrypt = require("bcryptjs")
// const validator=require('../validation/validator')

async function  SPGetDataLogin(req, res) {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        const result = await control.user.loginData(data);  
        if (!result.length) {
            return res.send("email doesn't exits ")
        }    
        var data1 = await bcrypt.compare(data.password, result[0].password);
        if (data1 == true) {
            let token = {
                id:data.email,
                key: "key1"
            }
           
            
            const Token_result = await jwt1.task.GenerateToken(token)
            res.json({
                message: "login successfull",
                status: 200,
                data: result,
                token: Token_result
            })
        }
        else if (data1 == false) {
            res.send("incorrect password")
        }
    }
    catch (err) {
        throw new err;
    }
};
async function SPGetDataSignup(req, res) {

    try {

        var hash_password = await bcrypt.hash(req.body.password, 10)
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: hash_password,
            lat:req.body.lat,
            lang:req.body.lang,
        }
        const result = await control.user.signupData(data);
        console.log(result);
        
        if (result == 0) {
            res.send("email already exits")

        }
        else {
            res.send("Successful signup")
        }
    }
    catch (err) {
        throw new err;
    }
};
async function UpdateProfile(req,res)
{
    try{
        let data={
            key: "key1",
            token:req.body.token

        }
        let token_result=await jwt1.task.VerifyToken(data)
        let verify_token=await control.user.VerificationToken(token_result)
        if(verify_token.length>0)
        {
            let hash_password = await bcrypt.hash(req.body.password, 10)
            let obj={
                name:req.body.name,
                email:req.body.email,
                password:hash_password,
                lat:req.body.lat,
                lang:req.body.lang,
             
            }
             let result=await control.user.Update(obj);
             // console.log(result);
             
             if(result==0)
             {
                 res.send("your data is not found")
               
             }
             else if(result==1){
                 console.log(result);
                 res.send("update sucessful")
             }
               
         } 
         else{
             res.send("token not matched");
         }
        }
        catch (err) {
            throw new err;
        }
    
        
}

exports.tasks = {
    SPGetDataLogin: SPGetDataLogin,
    SPGetDataSignup: SPGetDataSignup,
    UpdateProfile:UpdateProfile,
   
}
