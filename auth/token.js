const jwt=require("jsonwebtoken")
// const control = require('../services/SpService')

function GenerateToken(data)
{    
    return new Promise((resolve ,reject)=>
    {
        jwt.sign(data.id,data.key,(err,token)=>
        {
            if(err)
            {
                console.log(err);
                
                reject(err)
            }
            else{
                console.log(token);
                
                resolve(token)
            }
        })

    })
}
function VerifyToken(data)
{
    return new Promise((resolve ,reject)=>
    {
        
        jwt.verify(data.token,data.key,(err,decode)=>
        {
            if(err)
            {
                reject(err)
            }
            else{
                console.log(decode);
                resolve(decode);
            }
        })
    })

}
exports.task={
    GenerateToken:GenerateToken,
    VerifyToken:VerifyToken
}