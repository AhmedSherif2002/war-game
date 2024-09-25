const { apiUrl, con } = require("./global.js");
const { uploadPlayersStats } = require("./usersController.js");

const startNewGame = async (room) =>{
    console.log("starting a new game");
    return new Promise((resolve, reject)=>{
        con.query(`
            INSERT INTO games (room_id,started_at,game_type) 
            VALUES(${room},current_time(),"tdm");
            `,(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err);
                    // return err;
                }

                console.log("insert id: ",result.insertId);
                // cb(result.insertId);
                resolve(result.insertId);
        })
    })
}

const uploadGameStatus = (currRoom,room_id,players,score)=>{
    console.log("cr:", currRoom)
    console.log("roomid:", room_id)
    console.log("room players:", players);
    console.log("score:", score);
    const winner = score["team1"] > score["team2"] ? 1 : score["team1"] < score["team2"] ? 2 : null;
    const isDraw = score["team1"] === score["team2"] ? true:false;
    const game_id = currRoom.game_id;
    console.log("w:",winner)
    console.log("gid:",game_id)
    con.query(`
        UPDATE games 
        SET ended_at = current_time(), winner = ?, score = ('${JSON.stringify(score)}')
        WHERE id = ${game_id};
        `,[winner],
        (err,result)=>{
            if(err) {
                console.log("ge",err)
                return err;
            }
            console.log("game status",result);
            return result;
        })

    uploadPlayersStats(players,winner,isDraw,game_id);
    // for(let player_id in players){
    //     console.log("ppp", players[player_id]);
    //     const player = players[player_id];
    //     let win = winner === player.team ? true : false;
    //     con.query(`
    //         INSERT INTO plays (player_id,game_id,kills,deaths,score,team,win,kd_ratio)
    //         VALUES(${player_id},${game_id},${player.kills},${player.deaths},${player.score},${player.team},${win},${player.kd_ratio});
    //         `,(err,result)=>{
    //             if(err){
    //                 console.log(err);
    //                 return err;
    //             }
    //             console.log("p",player_id,result);
    //             return result;
    //     })
    // }
}

module.exports = {
    startNewGame,
    uploadGameStatus
}