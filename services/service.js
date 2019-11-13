var connect = require("../config/config");
function loginData(data) {

    
        return new Promise((resolve, reject) => {
            connect.service.connection.query("select email ,password from customer where email=?", [data.email], function (err, rows) {    
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
        connect.service.connection.query("select email from customer where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if (rows && rows.length) {
                console.log(rows);
                resolve(0)
               
                
            }
            else {
                var sql = ("insert into customer (name,email,password,lat,lang) values(?,?,?,?,?)");
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

exports.user = {
    loginData: loginData,
    signupData: signupData

}


