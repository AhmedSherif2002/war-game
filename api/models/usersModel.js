const bcrypt = require("bcrypt");
const { con } = require("../dbConnection");

const createUser = (user, cb) => {
    con.query(`SELECT * FROM users WHERE email="${user.email}"`, (err, result)=>{
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
                            console.log("user was successfully created");
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

module.exports = {
    createUser
}