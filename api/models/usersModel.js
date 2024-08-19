const bcrypt = require("bcrypt");
const { con } = require("../dbConnection");
const { ValidationError } = require("../classes/errors");

const createUser = (user, cb) => {
    con.query(`SELECT * FROM users WHERE email="${user.email}"`, (err, result)=>{
        if(err) return cb(err);
        try{
            if(result.length !== 0){
                throw Error("This email is already used");
            }
            con.query(`SELECT * FROM users WHERE ingame_name="${user.gamertag}"`, (err, result)=>{
                try{
                    if(result.length !== 0){
                        throw Error("This gamer tag is already used");
                    }
                    bcrypt.hash(user.password, 10).then(hash=>{
                        con.query(`
                            INSERT INTO users (first_name, last_name, email, user_password, ingame_name)
                            VALUES("${user.firstname}","${user.lastname}","${user.email}","${hash}","${user.gamertag}")
                        `, (err,results)=>{
                            if(err){
                                err.message = "database error";
                                return cb(err);
                            }
                            cb(null, results);
                        })
                    }) 
                }
                catch(err){
                    cb(err);
                }
            })
        }
        catch(err){
            cb(err);
        } 
    })
    
}

const validateUser = (user, cb)=>{
    con.query(`SELECT * FROM users WHERE email = "${user.email}"`, (err, result)=>{
        if(err) return cb(err);
        try{
            if(result.length === 0){
                throw new ValidationError("Email was not found", "email");
            }
            result = result[0];
            bcrypt.compare(user.password, result.user_password, (err,valid)=>{
                if(err) return cb(err)
                try{
                    if(valid){
                        cb(null, result);
                    }else{
                        throw new ValidationError("Wrong password", "password");
                    }
                }
                catch(err){
                    return cb(err);
                }
            })
        }
        catch(err){
            cb(err);
        }
    })
}

const getUserInfo = (user_id, cb)=>{
    con.query(`SELECT * FROM users WHERE id = "${user_id}"`, (err,result)=>{
        if(err) cb(err);
        delete result[0].user_password;
        cb(null,result[0]);
    })
}

module.exports = {
    createUser,
    validateUser,
    getUserInfo
}