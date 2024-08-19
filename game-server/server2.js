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
    socket.on("player_information", ({id, gamerTag, rank, room}, cb)=>{
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
            roomPlayers[id] = roomPlayers[id];
            roomPlayers[id]["socketId"] = socket.id;
        }else roomPlayers[id] = { id,gamerTag,room,socketId:socket.id,c:counter,rank};
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
        const player_room = players[player_id].room;
        console.log(player_id, "has disconnected.");
        delete players[player_id];
        delete roomPlayers[player_id];
        io.to(player_room).emit("playerDisconnected", player_id);
    })

    socket.on("startGame", ()=>{
        currRoom["inGame"] = true;
        let c = 0;
        for(let player in roomPlayers){
            console.log(player);
            roomPlayers[player].team = (c++%2)+1;
        }
        console.log(roomPlayers)
        const room = players[socket_idMap[socket.id]].room;
        io.to(room).emit("startGame", roomPlayers);
    })
    // console.log(counter)
    // const team = (counter % 2 === 0)?1:2;
    // // const position = respwanBase[team];
    // // assignTeam(team,socket.id);
    // players[socket.id].id = counter++;
    // // io.to(socket.id).emit("playerConnect", socket.id, team) // Send the id back to the player
    // // recieve player info
    // socket.on("info",(player, cb)=>{
    //     console.log(player.id,player.name)
    //     players[player.id].name = player.name;
    //     players[player.id].health = player.health =100;
    //     players[player.id].degree = player.degree = 0;
    //     players[player.id].position = player.position;
    //     // players[player.id].team = player.team = 1;
    //     players[player.id].speed = player.speed = 8;
    //     cb(players)
    //     console.log(player)
    //     player.team = players[player.id].team;
    //     socket.broadcast.emit("newPlayerConnects", player);
    //     console.log(players)
    //     // checkMemUsage();
    // })
    // // update player position
    // socket.on("updateLocation", (playerLocation)=>{
    //     // console.log("player has moved")
    //     players[playerLocation["id"]].position = playerLocation.position;
    //     socket.broadcast.emit("updatePlayerState", {id: playerLocation["id"], position: playerLocation.position});
    // })
    // // update player degree
    // socket.on("updateDegree", (playerDegree)=>{
    //     // console.log(playerDegree.degree,playerDegree.id)
    //     console.log("pp id",playerDegree["id"]);
    //     players[playerDegree["id"]].degree = playerDegree.degree;
    //     socket.broadcast.emit("updatePlayerDegree", {id: playerDegree["id"], degree: playerDegree.degree});
    // })
    // // Send players to the frontend
    // socket.on("requestPlayers",(cb)=>{
    //     cb(players)
    // })

    // // player shoots
    // socket.on("shoot",({x,y,m,c,degree})=>{
    //     const shooter = socket.id
    //     let playersHit = shoot(x, y, m, c, degree, players,shooter);
    //     for(let player of playersHit){
    //         if(players[player].health > 0){
    //             players[player].health -= 5;
    //             playersShot[player][shooter] = playersShot[player][shooter]?playersShot[player][shooter]+5:5;
    //         }
    //         if(players[player].health === 0){
    //             playersShot[player] = {};
    //             io.emit("playerKilled", shooter, player);
    //             setTimeout(()=>respawn(player),3000);
    //         }
    //     }
    //     // console.log("Players shot ",playersShot)
    // })

    // // when player disconnects
    // socket.on("disconnect",()=>{
    //     console.log("disconnected")
    //     if(players[socket.id].team === 1) team1.splice(team1.indexOf(socket.id),1);
    //     else team2.splice(team2.indexOf(socket.id),1);
    //     delete players[socket.id];
    //     io.emit("playerDisconnected", socket.id);
    //     // checkMemUsage();
    // })
})


app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"../frontend/index.html"))
})

// setTimeout(()=>{
//     process.exit();
// },5000)

const respawn = (player)=>{
    console.log(player)
    players[player].health = 100;
    io.emit("respawn" ,player);
}

const checkMemUsage = ()=>{
    console.log(process.memoryUsage());
}