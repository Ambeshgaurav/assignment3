var joi=require("joi")

function loginValidator(req,res,next)
{
    // console.log("---------------------");
    
    const schema=joi.object().keys({
        email:joi.string().required().email(),
        password:joi.string().min(5).max(100).required(),
    });
   joi.validate(req.body,schema,(err,result)=>
   {
       if(err)
          res.send("invalid email")
       else
          next();
   })
}
function signupValidator(req,res,next)
{
    const schema=joi.object().keys({
        name:joi.string().required(),
        email:joi.string().required().email(),
        password:joi.string().min(5).max(20).required(),
        lat:     joi.string().min(1).max(20).required(),
        lang:     joi.string().min(1).max(20).required(),

    });
    
      joi.validate(req.body,schema,(err,result)=>
   {
       if(err)
       {
        res.send("invalid data please provide in  valid format")
       }
       else
       {
        next();
       }
         
   }) 
}
function signupValidatorAdmin(req,res,next)
{
    console.log("hello world");
    
    console.log(req);
    
    const schema=joi.object().keys({
        name:joi.string().required(),
        email:joi.string().required().email(),
        password:joi.string().min(5).max(20).required(),

    });
    
      joi.validate(req.body,schema,(err,result)=>
   {
       if(err)
       {
        res.send("invalid format of data")
        console.log(err);
        

       }
         
       else
          next();
   }) 
}
exports.task={
    loginValidator:loginValidator,
    signupValidator:signupValidator,
    signupValidatorAdmin:signupValidatorAdmin,

}