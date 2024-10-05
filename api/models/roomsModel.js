const { con } = require("../dbConnection");
const { ValidationError } = require("../classes/errors");

const createNewRoom = (adminId, cb)=>{
    con.query(`SELECT * FROM rooms WHERE currently_online IS NULL`, (err,results)=>{
        if(err) return cb(err);
        if(results.length === 0){
            con.query(`INSERT INTO rooms (currently_online,number_of_players) VALUES(?,?)`,[true,1], (err,results)=>{
                if(err) return cb(err);
                cb(null, results);
            })
        }
    })
} 

const join = (player_id, roomId, cb)=>{
    con.query(`SELECT * FROM rooms WHERE room_id=${roomId} AND currently_online=true`,(err, results)=>{
        if(err) return cb(err);
        // if(!results.length) 
        try{
            if(!results.length) throw Error("Room was not Found");
            con.query(`UPDATE rooms SET number_of_players = number_of_players+1 WHERE room_id=?`,[roomId], (err,results)=>{
                if(err) cb(err);
                cb(null, true);
            })
        }catch(e){
            cb(e);
        }
    })
}

module.exports = {
    createNewRoom,
    join
}