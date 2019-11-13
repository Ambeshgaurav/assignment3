var express = require("express")
const bcrypt = require("bcryptjs")

function encrypt(password) {

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err)
                reject("error")
            else {
                resolve(hash)
            }
        });
    });
}    
// bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
//     // res == true
// });
function compare_pass(data1) {
    return new Promise((resolve, reject) => {
        console.log(data1.password);
        console.log(data1.result);
        bcrypt.compare(data1.password, data1.result).then( function (res1) {
            console.log(res1);
                if (res1 == true) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        });
    });


}
exports.pass = {
    encrypt: encrypt,
    compare_pass: compare_pass

}
