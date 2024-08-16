const { con } = require("../dbConnection");
const { ValidationError } = require("../classes/errors");

const createNewRoom = (adminId, cb)=>{
    console.log(adminId);
    con.query(`SELECT * FROM rooms WHERE currently_online IS NULL`, (err,results)=>{
        console.log(err);
        console.log(results);
        if(err) return cb(err);
        if(results.length === 0){
            con.query(`INSERT INTO rooms (currently_online,number_of_players) VALUES(?,?)`,[true,0], (err,results)=>{
                console.log(err)
                console.log(results);
                if(err) return cb(err);
                cb(null, results);
            })
        }
    })
} 

module.exports = {
    createNewRoom
}