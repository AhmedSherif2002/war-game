const express = require("express")
const cors = require("cors");
const {join} = require("path")
const { createServer } = require("http")
const { Server } = require("socket.io")
const { shoot } = require("./controller/shootController")
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
        // players[id].position = respwanBase[2];
    }
}

io.on("connect",(socket)=>{
    counter++;
    console.log("connection established")
    console.log("socket id:", socket.id)
    // players[socket.id] = {}
    let roomPlayers;
    let currRoom;
    socket.on("askForRoomJoin", ({ room }, cb)=>{
        console.log("ask")
        console.log("room", rooms[room]);
        if(rooms[room]){
            if(rooms[room]["inGame"]){
                cb(false)
            }else cb(true)
        }else cb(true);
    })
    socket.on("player_information", ({id, gamerTag, rank, room, xp}, cb)=>{
        if(!room) return;
        
        // if(players[id]){
        //     console.log(rooms[room]["players"][players[id]["socketId"]])
        //     delete rooms[room]["players"][players[id]["socketId"]];
        // }
        socket_idMap[socket.id] = id;
        players[id] = {};
        players[id]["room"] = room;
        players[id]["gamerTag"] = gamerTag;
        players[id]["socketId"] = socket.id;
        players[id]["rank"] = rank;
        currRoom = rooms[room] = rooms[room]?rooms[room]:{};
        currRoom["inGame"] = currRoom["inGame"]?currRoom["inGame"]:false;
        roomPlayers = currRoom["players"] = currRoom["players"]?currRoom["players"]:{};
        // roomPlayers[socket.id] = { id,gamerTag,room }
        if(roomPlayers[id]){
            // roomPlayers[id] = roomPlayers[id];
            roomPlayers[id]["socketId"] = socket.id;
        }else roomPlayers[id] = { id,gamerTag,room,socketId:socket.id,c:counter,rank,xp, kills:0, deaths:0, score:0};
        // roomPlayers[id] = roomPlayers[id]?roomPlayers[id] && (roomPlayers[id]["socketId"] = socket.id):{ id,gamerTag,room,socketId:socket.id};
        // roomPlayers[id] = roomPlayers[id]?roomPlayers[id]:{ id,gamerTag,room,socketId:socket.id};
        currRoom["number_of_players"] = Object.keys(currRoom.players).length;
        console.log("current room:",currRoom)
        console.log("roomPlayers", roomPlayers)
        console.log("rooms",rooms)
        console.log("server players" ,players)
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

    socket.on("startGame", ()=>{
        currRoom["inGame"] = true;
        let c = 0;
        for(let player in roomPlayers){
            console.log(player);
            roomPlayers[player].team = (c++%2)+1;
            roomPlayers[player].health = 100;
            roomPlayers[player].position = respawnPosition[(c%2)+1];
        }
        console.log(roomPlayers)
        const room = players[socket_idMap[socket.id]].room;
        io.to(room).emit("startGame", roomPlayers);
        let counter = 10;
        const counterInt = setInterval(()=>{
            io.to(room).emit("startingTimerDecree",--counter);
            if(counter === 0){
                clearInterval(counterInt);
                io.to(room).emit("begin");
                let mins = 10;
                let secs = 60;
                let gameInterval;
                gameInterval = setInterval(()=>{
                    io.to(room).emit("gameTimerCountDown", mins, --secs);
                    if(secs === 0){
                        if(mins === 0){
                            clearInterval(gameInterval);
                            io.to(room).emit("end");
                            end(room,roomPlayers);
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
        // console.log("player has moved")
        players[playerLocation["id"]].position = playerLocation.position;
        roomPlayers[playerLocation["id"]].position = playerLocation.position;
        const room = players[socket_idMap[socket.id]].room;
        socket.to(room).emit("updatePlayerState", {id: playerLocation["id"], position: playerLocation.position});
    })
    // update player degree
    socket.on("updateDegree", (playerDegree)=>{
        // console.log(playerDegree.degree,playerDegree.id)
        console.log("pp id",playerDegree["id"]);
        players[playerDegree["id"]].degree = playerDegree.degree;
        roomPlayers[playerDegree["id"]].degree = playerDegree.degree;
        const room = players[socket_idMap[socket.id]].room;
        socket.to(room).emit("updatePlayerDegree", {id: playerDegree["id"], degree: playerDegree.degree});
    })
    // player shoots
    socket.on("shoot",({x,y,m,c,degree})=>{
        const shooter = socket_idMap[socket.id]
        console.log("shooter",roomPlayers[shooter])
        let playersHit = shoot(x, y, m, c, degree, roomPlayers,shooter);
        for(let player of playersHit){
            if(roomPlayers[player].health > 0){
                roomPlayers[player].health -= 5;
                console.log("playersHit",playersHit)
                console.log("player Hit",player)
                playersShot[player] = {};
                playersShot[player][shooter] = playersShot[player][shooter]?playersShot[player][shooter]+5:5;
            }
            if(roomPlayers[player].health === 0){
                playersShot[player] = {};
                const room = players[player].room;
                io.to(room).emit("playerKilled", shooter, player);
                player[shooter] = roomPlayers[shooter].kills += 1;
                player[shooter] = roomPlayers[shooter].score += 10;
                player[player] = roomPlayers[player].deaths += 1;
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
    console.log(player)
    players[player].health = 100;
    roomPlayers[player].health = 100;
    const room = players[player].room;
    console.log(player)
    io.to(room).emit("respawn" ,player);
}

const checkMemUsage = ()=>{
    console.log(process.memoryUsage());
}

const end = (room, players)=>{
    const score = {};
    console.log("end")
    console.log("players",players)
    console.log("room",room)
}