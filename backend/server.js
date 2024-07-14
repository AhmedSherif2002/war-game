const express = require("express")
const cors = require("cors");
const {join} = require("path")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        // origin: "*"
    }
})
app.use(express.static('../frontend'))
app.use(cors({
    origin: "*"
}))
let counter = 0;
let players = {}

server.listen(4000,()=>{
    console.log("server is running on port", 4000)
})

io.on("connection",(socket)=>{
    // Establish a connection and give the player an id
    console.log("connection established")
    console.log(socket.id)
    players[socket.id] = {}
    players[socket.id].id = counter++;
    io.to(socket.id).emit("playerConnect", socket.id) // Send the id back to the player
    // recieve player info
    socket.on("info",(player, cb)=>{
        console.log(player.id,player.name)
        players[player.id].name = player.name;
        players[player.id].health = player.health =100;
        players[player.id].degree = player.speed = 0;
        players[player.id].position = player.position;
        players[player.id].team = player.team = 1;
        players[player.id].speed = player.speed = 8;
        cb(players)
        console.log(player)
        socket.broadcast.emit("newPlayerConnects", player);
        console.log(players)
    })
    // update player position
    socket.on("updateLocation", (playerLocation)=>{
        console.log("player has moved")
        players[playerLocation["id"]].position = playerLocation.position;
        socket.broadcast.emit("updatePlayerState", {id: playerLocation["id"], position: playerLocation.position});
    })
    // update player degree
    socket.on("updateDegree", (playerDegree)=>{
        console.log("player has moved")
        players[playerDegree["id"]].degree = playerDegree.position;
        socket.broadcast.emit("updatePlayerDegree", {id: playerDegree["id"], degree: playerDegree.degree});
    })
    // Send players to the frontend
    socket.on("requestPlayers",(cb)=>{
        cb(players)
    })

    // when player disconnects
    socket.on("disconnect",()=>{
        console.log("disconnected")
    })
})


app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"../frontend/index.html"))
})
