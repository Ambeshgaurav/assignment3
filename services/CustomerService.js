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
function Update(data)
{  
    return new Promise((resolve,reject)=>
    {
        var sql=('UPDATE `customer` SET `name`=?,`password`=?,`lat`=?,`lang`=? where `email`=?');
    connect.service.connection.query(sql, [data.name,data.password,data.lat,data.lang,data.email], function (err, rows) {
            if (err)
            {
                reject(err)
            }
               
            else {
                if(rows.affectedRows=='1'){
                    resolve(1)
                }else{
                    resolve(0)
                }
                
               
            }

        });
    })

}
function findLocation(data)
{
    var ori_lat=data.lat;
    var ori_lon=data.lang;
    return new Promise((resolve,reject)=>
    {  
        connect.service.connection.query("select lat,lang from sp ", function (err, rows) {
    //    console.log(rows);
        for(var i of rows)
        {
            var dest_lat=i.lat;
            var dest_lang=i.lang;
            console.log(dest_lat,dest_lang);
            
            connect.service.connection.query(`select *,3956*2*asin(sqrt(pow(sin(abs(${ori_lat - dest_lang})*PI()/180/2),2)
            +cos(${ori_lat}*PI()/180)*cos(${dest_lat}*PI()/180)*pow(sin(abs(${ori_lon - dest_lang})*
            
            PI()/180/2
            ),2))) as distance from sp  having distance<5000000 `, function (err, rows) {


if(err){
    console.log("error in query");
    
}else{
    if(rows && rows.length>0){
        //console.log(rows);
        resolve(rows);
        
    }
}
 });
    }
       });
       })

}
function VerificationToken(data)
{
    return new Promise((resolve,reject)=>
    {
        connect.service.connection.query("select email from  customer where email =?", [data], function (err, rows) {
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
      findLocation:findLocation,
      VerificationToken:VerificationToken,

}


