const { apiUrl, con } = require("./global.js");


const uploadPlayersStats = (players,winner,isDraw,game_id)=>{
    console.log("players:>",players);
    for(let player_id in players){
        console.log("ppp", players[player_id]);
        const player = players[player_id];
        let win = winner === player.team ? true : false;
        con.query(`
            INSERT INTO plays (player_id,game_id,kills,deaths,score,team,win,kd_ratio)
            VALUES(${player_id},${game_id},${player.kills},${player.deaths},${player.score},${player.team},${win},${player.kd_ratio});
            `,(err,result)=>{
                if(err){
                    console.log(err);
                    return err;
                }
                console.log("p",player_id,result);
                return result;
        })

        con.query(`UPDATE users SET 
                    kills = kills + ?,
                    deaths = deaths + ?,
                    wins = wins + ${win?1:0},
                    loses = loses + ${ !win && !isDraw ? 1:0 },
                    player_rank = ?,
                    xp = ${player.xp}
                WHERE id = ?
            `,[player.kills,player.deaths,player.rank,player_id], (err, result)=>{
                if(err){
                    console.log(err);
                    return err;
                }
                console.log(result);
                console.log("Players updated");
            })
    }
}

module.exports = {
    uploadPlayersStats
}
