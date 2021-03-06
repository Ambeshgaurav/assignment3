const control = require('../services/service')
const jwt1 = require('../auth/token')
const async = require("async");
// const hash = require("./hashing")
const bcrypt = require("bcryptjs")
// const validator=require('../validation/validator')

async function  CustomerGetDataLogin(req, res) {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        // console.log(data);

        const result = await control.user.loginData(data);
        // console.log(result);
        if (!result.length) {
            return res.send("email doesn't exits ")
        }
        var data1 = await bcrypt.compare(data.password, result[0].password);
        if (data1 == true) {
            let token = {
                id: data.email,
                key: "key1"
            }
            console.log(token);


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
async function CustomerGetDataSignup(req, res) {

    try {

        var hashname = await bcrypt.hash(req.body.password, 10)
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: hashname,
            lat:req.body.lat,
            lang:req.body.lang,
        }
        const result = await control.user.signupData(data);
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


async function  AdminGetDataLogin(req, res) {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        // console.log(data);

        const result = await control.user.loginData(data);
        // console.log(result);
        if (!result.length) {
            return res.send("email doesn't exits ")
        }
        var data1 = await bcrypt.compare(data.password, result[0].password);
        if (data1 == true) {
            let token = {
                id: data.email,
                key: "key1"
            }
            console.log(token);


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
async function AdminGetDataSignup(req, res) {

    try {

        var hashname = await bcrypt.hash(req.body.password, 10)
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: hashname,
            lat:req.body.lat,
            lang:req.body.lang,
        }
        const result = await control.user.signupData(data);
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
exports.tasks = {
    CustomerGetDataLogin: CustomerGetDataLogin,
    CustomerGetDataSignup: CustomerGetDataSignup,
    // SPGetDataLogin: SPGetDataLogin,
    // SPGetDataSignup: SPGetDataSignup,
    AdminGetDataLogin: AdminGetDataLogin,
    AdminGetDataSignup: AdminGetDataSignup,

}


 // let data1=
    // {
    //     password:req.body.password,
    //     result:result[0].password,
    // }

    // const result1=await hash.pass.compare_pass(data1)



// if (result[0].password === req.body.password) {
//     res.json({
//         message: "login successfull",
//         status: 200,
//         data: result
//     })
//     console.log(result);

// }


//jwt
        // jwt.sign(data.email,"hello",(err,token)=>
        // {
        //     if(err)
        //     {
        //         res.send("token not generated")
        //     }
        //     else{
        //         res.json({
        //             message: "login successfull",
        //             status: 200,
        //             data: result,
        //             token:token
        //         })
        //     }
        // })

