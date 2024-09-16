const express = require("express")
const cors = require("cors");
const {join} = require("path")
const { createServer } = require("http")
const { Server } = require("socket.io")
const { shoot } = require("./controller/shootController")
const { startNewGame, uploadGameStatus } = require("./controllers/gamesController");
const canvasWidth = 4000;
const canvasHeight = 4100;
const app = express();
const port = process.env.PORT | 3000;
const server = createServer(app);
const io = new Server(server,{
    cors:{
        // origin: "*"
    },
})
app.use(express.static('../frontend'))
app.use(cors({
    origin: "*"
}))

let counter = 0;
let players = {}
let team1 = []
let team2 = []
let playersShot = {};
let rooms = {};
let socket_idMap = {};
const respawnPosition = {
    1:{
        x: 50,
        y: 50,
    },
    2:{
        x: 100,
        y: 50
    }
}

server.listen(port,()=>{
    console.log("server is running on port", port)
})

const assignTeam = (teamNumber, id)=>{
    playersShot[id] = {}
    console.log("teamNumber",teamNumber, teamNumber === 1)
    if(teamNumber === 1){
        team1.push(id)
        players[id].team = 1;
    }else{
        team2.push(id)
        players[id].team = 2;
    }
}

io.on("connect",(socket)=>{
    counter++;
    console.log("connection established")
    console.log("socket id:", socket.id)
    let roomPlayers;
    let currRoom;
    socket.on("askForRoomJoin", ({ room }, cb)=>{
        if(rooms[room]){
            if(rooms[room]["inGame"]){
                cb(false)
            }else cb(true)
        }else cb(true);
    })
    socket.on("player_information", ({id, gamerTag, rank, room, xp}, cb)=>{
        if(!room) return;
        socket_idMap[socket.id] = id;
        players[id] = {};
        players[id]["room"] = room;
        players[id]["gamerTag"] = gamerTag;
        players[id]["socketId"] = socket.id;
        players[id]["rank"] = rank;
        currRoom = rooms[room] = rooms[room]?rooms[room]:{};
        currRoom["inGame"] = currRoom["inGame"]?currRoom["inGame"]:false;
        roomPlayers = currRoom["players"] = currRoom["players"]?currRoom["players"]:{};
        if(roomPlayers[id]){
            roomPlayers[id]["socketId"] = socket.id;
        }else roomPlayers[id] = { id,gamerTag,room,socketId:socket.id,c:counter,rank,xp, kills:0, deaths:0, kd_ratio:0, score:0};
        currRoom["number_of_players"] = Object.keys(currRoom.players).length;
        socket.join(room)
        cb(roomPlayers);
        socket.to(room).emit('newPlayerConnects', roomPlayers[id])
    })

    socket.on("disconnect", ()=>{
        const player_id = socket_idMap[socket.id];
        const room = players[player_id].room;
        console.log(player_id, "has disconnected.");
        delete players[player_id];
        delete roomPlayers[player_id];
        io.to(room).emit("playerDisconnected", player_id);
    })

    socket.on("startGame", async ()=>{
        const room = players[socket_idMap[socket.id]].room;
        const game_id = await startNewGame(room);
        currRoom["game_id"] = game_id
        currRoom["inGame"] = true;
        console.log("current room", currRoom)
        let c = 0;
        for(let player in roomPlayers){
            roomPlayers[player].team = (c++%2)+1;
            roomPlayers[player].health = 100;
            roomPlayers[player].position = respawnPosition[(c%2)+1];
        }
        io.to(room).emit("startGame", roomPlayers);
        let counter = 1;
        const counterInt = setInterval(()=>{
            io.to(room).emit("startingTimerDecrease",--counter);
            if(counter === 0){
                clearInterval(counterInt);
                io.to(room).emit("begin");
                let mins = 0;
                let secs = 2;
                let gameInterval;
                gameInterval = setInterval(()=>{
                    io.to(room).emit("gameTimerCountDown", mins, --secs);
                    if(secs === 0){
                        if(mins === 0){
                            clearInterval(gameInterval);
                            io.to(room).emit("end");
                            end(currRoom,room,roomPlayers);
                            return
                        }
                        secs = 60;
                        mins--;
                    }
                },1000);
            }
        },1000);
    })
    // update player position
    socket.on("updateLocation", (playerLocation)=>{
        players[playerLocation["id"]].position = playerLocation.position;
        roomPlayers[playerLocation["id"]].position = playerLocation.position;
        const room = players[socket_idMap[socket.id]].room;
        socket.to(room).emit("updatePlayerState", {id: playerLocation["id"], position: playerLocation.position});
    })
    // update player degree
    socket.on("updateDegree", (playerDegree)=>{
        players[playerDegree["id"]].degree = playerDegree.degree;
        roomPlayers[playerDegree["id"]].degree = playerDegree.degree;
        const room = players[socket_idMap[socket.id]].room;
        socket.to(room).emit("updatePlayerDegree", {id: playerDegree["id"], degree: playerDegree.degree});
    })
    // player shoots
    socket.on("shoot",({x,y,m,c,degree})=>{
        const shooter = socket_idMap[socket.id]
        let playersHit = shoot(x, y, m, c, degree, roomPlayers,shooter);
        for(let player of playersHit){
            if(roomPlayers[player].health > 0){
                roomPlayers[player].health -= 5;
                playersShot[player] = {};
                playersShot[player][shooter] = playersShot[player][shooter]?playersShot[player][shooter]+5:5;
            }
            if(roomPlayers[player].health === 0){
                playersShot[player] = {};
                const room = players[player].room;
                // player[shooter] = roomPlayers[shooter].kills += 1;
                // player[shooter] = roomPlayers[shooter].score += 10;
                // player[player] = roomPlayers[player].deaths += 1;
                roomPlayers[shooter].kills += 1;
                roomPlayers[shooter].score += 10;
                roomPlayers[shooter].kd_ratio = roomPlayers[shooter].deaths !== 0 ?  roomPlayers[shooter].kills/roomPlayers[shooter].deaths : roomPlayers[shooter].kills;
                roomPlayers[player].deaths += 1;
                roomPlayers[player].kd_ratio = roomPlayers[player].deaths !== 0 ?  roomPlayers[player].kills/roomPlayers[player].deaths : roomPlayers[player].kills;
                console.log("player", player)
                io.to(room).emit("playerKilled", shooter, player, roomPlayers);
                setTimeout(()=>respawn(roomPlayers,player),3000);
            }
        }
    })
})


app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"../frontend/index.html"))
})

// setTimeout(()=>{
//     process.exit();
// },5000)

const respawn = (roomPlayers,player)=>{
    // console.log(player)
    players[player].health = 100;
    roomPlayers[player].health = 100;
    const room = players[player].room;
    // console.log(player)
    io.to(room).emit("respawn" ,player);
}

const end = (currRoom,room_id, roomPlayers)=>{
    let score = { team1:0, team2:0 };
    for(let player_id in roomPlayers){
        console.log("ppp",roomPlayers[player_id]);
        if(roomPlayers[player_id].team === 1){
            score["team1"] += roomPlayers[player_id].score;
        }else
        score["team2"] += roomPlayers[player_id].score;
    }
    // console.log("end")
    // console.log("players",players)
    // console.log("room",room_id)

    // send game data to the database (api).

    uploadGameStatus(currRoom,room_id,roomPlayers,score);
}