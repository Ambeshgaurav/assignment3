var connect = require("../config/config");
function loginData(data) {

    // console.log(data);
    
        return new Promise((resolve, reject) => {
            connect.service.connection.query("select  id,email ,password from sp where email=?", [data.email], function (err, rows) {    
                if (err) {
                    reject(err)
                }
                else {
                    // console.log("hello");
                    // console.log(rows); 
                    resolve(rows)
                   
                }
            });
        });   
}
function signupData(data) {

    return new Promise((resolve, reject) => {
        connect.service.connection.query("select email from sp where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if (rows && rows.length) {
                console.log(rows);
                resolve(0)
               
                
            }
            else {
                var sql = ("insert into sp (name,email,password,lat,lang) values(?,?,?,?,?)");
                connect.service.connection.query(sql, [data.name,data.email,data.password,data.lat,data.lang], function (err, rows) {
                    // console.log(err,rows);
                    
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
function Update(data)
{
    // console.log(data);
    
    return new Promise((resolve,reject)=>
    {
        var sql=('UPDATE `sp` SET `name`=?,`password`=?,`lat`=?,`lang`=? where `email`=?');
    connect.service.connection.query(sql, [data.name,data.password,data.lat,data.lang,data.email], function (err, rows) {
            console.log(err,rows);
            if (err)
                reject(err)
            else {
              if(rows.affectedRows==0)
              {
                  resolve(0)
              }
              else{
                  resolve(1)
              }
            }

        });
    })

}
function VerificationToken(data)
{
    return new Promise((resolve,reject)=>
    {
    connect.service.connection.query("select email from sp where email =?", [data], function (err, rows) {
        if(err)
        {
            reject(err)
        }
        else{
            resolve(rows)
            console.log(rows);
            
        }
    })
            
    

    })
}

exports.user = {
    loginData: loginData,
    signupData: signupData,
     Update:Update,
     VerificationToken:VerificationToken,

}


