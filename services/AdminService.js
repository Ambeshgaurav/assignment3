var connect = require("../config/config");
function loginData(data) {

    
        return new Promise((resolve, reject) => {
            connect.service.connection.query("select email ,password from admin where email=?", [data.email], function (err, rows) {    
                if (err) {
                    reject(err)
                }
                else {
                    // console.log("hello");
                    
                    resolve(rows)
                    // console.log(rows); 
                }
            });
        }); 
}
function signupData(data) {

    return new Promise((resolve, reject) => {
        connect.service.connection.query("select email from admin where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if (rows && rows.length) {
                console.log(rows);
                resolve(0)
               
                
            }
            else {
                var sql = ("insert into admin (name,email,password) values(?,?,?)");
                connect.service.connection.query(sql, [data.name,data.email,data.password,data.lat,data.lang], function (err, rows) {
                    console.log(err,rows);
                    
                    if (err)
                        reject(err)
                    else {
                        resolve(rows)
                    }

                });
            }


        });

    });

}
function CustomerData(data)
{
    console.log(data);
    
    return new Promise((resolve,reject)=>
    {
        
        connect.service.connection.query("select * from customer", function (err, rows) {
            console.log(err,rows);
            
            if (err)
                reject(err)
            else {
                resolve(rows)
            }

        });
    
    })
}
function  SPData(data)
{
    return new Promise((resolve,reject)=>
    {
        
        connect.service.connection.query("select * from sp", function (err, rows) {   
            if (err)
                reject(err)
            else {
                resolve(rows)
            }

        });
    
    })
}

exports.user = {
    loginData: loginData,
    signupData: signupData,
    CustomerData:CustomerData,
    SPData:SPData,

}


