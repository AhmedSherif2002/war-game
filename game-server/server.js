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

io.on("connection",(socket)=>{
    // Establish a connection and give the player an id
    console.log("connection established")
    console.log(socket.id)
    players[socket.id] = {}
    
    console.log(counter)
    const team = (counter % 2 === 0)?1:2;
    // const position = respwanBase[team];
    assignTeam(team,socket.id);
    players[socket.id].id = counter++;
    io.to(socket.id).emit("playerConnect", socket.id, team) // Send the id back to the player
    // recieve player info
    socket.on("info",(player, cb)=>{
        console.log(player.id,player.name)
        players[player.id].name = player.name;
        players[player.id].health = player.health =100;
        players[player.id].degree = player.degree = 0;
        players[player.id].position = player.position;
        // players[player.id].team = player.team = 1;
        players[player.id].speed = player.speed = 8;
        cb(players)
        console.log(player)
        player.team = players[player.id].team;
        socket.broadcast.emit("newPlayerConnects", player);
        console.log(players)
        // checkMemUsage();
    })
    // update player position
    socket.on("updateLocation", (playerLocation)=>{
        // console.log("player has moved")
        players[playerLocation["id"]].position = playerLocation.position;
        socket.broadcast.emit("updatePlayerState", {id: playerLocation["id"], position: playerLocation.position});
    })
    // update player degree
    socket.on("updateDegree", (playerDegree)=>{
        // console.log(playerDegree.degree,playerDegree.id)
        players[playerDegree["id"]].degree = playerDegree.degree;
        socket.broadcast.emit("updatePlayerDegree", {id: playerDegree["id"], degree: playerDegree.degree});
    })
    // Send players to the frontend
    socket.on("requestPlayers",(cb)=>{
        cb(players)
    })

    // player shoots
    socket.on("shoot",({x,y,m,c,degree})=>{
        const shooter = socket.id
        let playersHit = shoot(x, y, m, c, degree, players,shooter);
        for(let player of playersHit){
            if(players[player].health > 0){
                players[player].health -= 5;
                playersShot[player][shooter] = playersShot[player][shooter]?playersShot[player][shooter]+5:5;
            }
            if(players[player].health === 0){
                playersShot[player] = {};
                io.emit("playerKilled", shooter, player);
                setTimeout(()=>respawn(player),3000);
            }
        }
        // console.log("Players shot ",playersShot)
    })

    // when player disconnects
    socket.on("disconnect",()=>{
        console.log("disconnected")
        if(players[socket.id].team === 1) team1.splice(team1.indexOf(socket.id),1);
        else team2.splice(team2.indexOf(socket.id),1);
        delete players[socket.id];
        io.emit("playerDisconnected", socket.id);
        // checkMemUsage();
    })
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