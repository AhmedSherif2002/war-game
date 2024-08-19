import MainPlayer from "./classes/MainPlayer.js"
import Map from "./classes/Map.js";
import BulletsController from "./classes/BulletsController.mjs";
import Player from "./classes/Player.js";

// const socket = io("https://war-game-server.onrender.com");
const socket = io("http://localhost:3000/");
setTimeout(()=>{
    console.log(socket)
},1000)
let player1;
let players = {}
const respawn = {
    1:{
        x: 50,
        y: 50,
    },
    2:{
        x: 100,
        y: 4000
    }
}

socket.on("connect", ()=>{
    console.log("connected")
})

socket.on("disconnect", ()=>{
    console.log("socket disconnected");
    window.location.reload();
        
})

// when the player connects (get the id, send info to the server, retrieve other players data)
socket.on("playerConnect",(id, team, position)=>{
    console.log("new")
    console.log(id)
    posX = respawn[team].x
    posY = respawn[team].y
    // Adjust the Camera to be at the spawn place
    canvas.style.transform = `translate(${-(posX-camWidth/2)}px,${-(posY-camHeight/2)}px)`;
    player1 = new MainPlayer(id,posX,posY,team,canvas,mapObstacles,1,ctx,bulletsController,socket)
    update()
    socket.emit("info", {id: id, name: "player 1", position: {x: posX, y: posY}}, (serverPlayers)=>{
        console.log("new player");
        // clearInterval(updatePlayersInt)
        for(let playerId in serverPlayers){
            const color = serverPlayers[playerId].team === team?"#0000ff":"red";
            const player = new Player(playerId, serverPlayers[playerId].position.x, serverPlayers[playerId].position.y, 100, serverPlayers[playerId].team, color, ctx)
            players[playerId] = player;
        }
        console.log(players)
    });
})

// new player connects to the game server
socket.on("newPlayerConnects", (player)=>{
    console.log(player.id,player);
    const color = player.team === player1.team?"#0000ff":"red";
    const newPlayer = new Player(player.id, player.position.x, player.position.y, 100, player.team, color,ctx)
    players[player.id] = newPlayer;
})

socket.on("updatePlayerState",(player)=>{ // when any player on the server state changes
    console.log("updating players now")
    players[player.id].x = player.position.x
    players[player.id].y = player.position.y
})

socket.on("updatePlayerDegree",(player)=>{ // when any player on the server state changes
    console.log("updating players now")
    players[player.id].degree = player.degree
})

socket.on("playerKilled", (shooter, killedPlayer)=>{ // when a player is killed
    players[killedPlayer].health = 0;
    players[killedPlayer].killed = true;
    if(killedPlayer === player1.id){
        // alert("You are killed by " + shooter);
        ctx.clearRect(0,0,width*1,height*1);
        killed = true
        killHandler(shooter)
    }
    if(shooter === player1.id){
        console.log("you killed", killedPlayer);
    }
    console.log(shooter, killedPlayer)
})

socket.on("respawn", player=>{
    players[player].health = 100;
    players[player].killed = false;
    players[player].position = respawn[players[player].team];
    if(player === player1.id)
        respawnHandler()
})

socket.on("playerDisconnected", (disconnectedPlayer)=>{
    delete players[disconnectedPlayer];
})

const canvas = document.getElementById("canvas");
const miniMapCanvas = document.getElementById("minimap")
const camera = document.getElementById("camera")
const ctx = canvas.getContext("2d");
const miniCtx = miniMapCanvas.getContext("2d")
const rifleCtx = canvas.getContext("2d")
const width = 4000; // canvas width
const height = 4100;  // canvas height
const camWidth = 1600; 
const camHeight = 700; 
let posX = width / 2; // x-position of player
let posY = height / 2; // y-position of player
let degree = 0; // Degree of rotaion of the player
let shoot = false; // for shooting 
let aim = false;
let killed = false;
let bullets = []
// Images
let fighterImage = new Image();
let tank = new Image();
let rifle = new Image();
let mapObstacles = [  // map obstacles
    {
        x: 100,
        y: 100,
        width: 300,
        height: 300,
    },
    {
        x: 600,
        y: 100,
        width: 300,
        height: 300
    },
    {
        x: 1100,
        y: 100,
        width: 300,
        height: 300,
    },
    {
        x: 1600,
        y: 100,
        width: 300,
        height: 300,
    },
    {
        x: 2100,
        y: 100,
        width: 300,
        height: 300,
    },
    {
        x: 2600,
        y: 100,
        width: 300,
        height: 300
    },
    {
        x: 2975,
        y: 170,
        width: 480,
        height: 4
    },
    {
        x: 3455,
        y: 175,
        width: 4,
        height: 165
    },
    {
        x: 2975,
        y: 340,
        width: 480,
        height: 4
    },
    {
        x: 2970,
        y: 175,
        width: 4,
        height: 165
    },
    {
        x: 100,
        y: 550,
        width: 1300,
        height: 300
    },
    {
        x: 1605,
        y: 550,
        width: 580,
        height: 20,
    },
    {
        x: 2400,
        y: 550,
        width: 500,
        height: 20,
    },
    {
        x: 1600,
        y: 550,
        width: 20,
        height: 100,
    },
    {
        x: 1600,
        y: 550,
        width: 1300,
        height: 300,
        alpha: 0.3
    },
    {
        x: 1600,
        y: 750,
        width: 20,
        height: 100,
    },
    {
        x: 1605,
        y: 830,
        width: 580,
        height: 20,
    },
    {
        x: 2400,
        y: 830,
        width: 500,
        height: 20,
    },
    {
        x: 2900,
        y: 550,
        width: 20,
        height: 180,
    },
    {
        x: 1300,
        y: 1000,
        width: 600,
        height: 400,
    },
    {
        x: 1300,
        y: 1600,
        width: 600,
        height: 1100,
    },
    {
        x: 1300,
        y: 2900,
        width: 600,
        height: 400,
    },
    {
        x: 2100,
        y: 1000,
        width: 900,
        height: 900
    },
    {
        x: 2100,
        y: 2400,
        width: 900,
        height: 900
    },
    {
        x: 3200,
        y: 1000,
        width: 600,
        height: 400,
    },
    {
        x: 3200,
        y: 1600,
        width: 600,
        height: 1100,
    },
    {
        x: 3200,
        y: 2900,
        width: 600,
        height: 400,
    },
    {
        x: 2800,
        y: 1900,
        width: 20,
        height: 100
    },
    {
        x: 2300,
        y: 2300,
        width: 20,
        height: 100
    },
    {
        x: 2450,
        y: 2050,
        width: 200,
        height: 200
    },
    {
        x: 1300,
        y: 3440,
        width: 200,
        height: 400
    },
    {
        x: 1700,
        y: 3440,
        width: 200,
        height: 400
    },
    {
        x: 2100,
        y: 3440,
        width: 300,
        height: 210
    },
    {
        x: 2700,
        y: 3440,
        width: 300,
        height: 210
    },
    {
        x: 3200,
        y: 3440,
        width: 200,
        height: 400
    },
    {
        x: 3600,
        y: 3440,
        width: 200,
        height: 400
    },
    {
        x: 2150,
        y: 3640,
        width: 2,
        height: 170
    },
    {
        x: 2160,
        y: 3820,
        width: 190,
        height: 2
    },
    {
        x: 2360,
        y: 3640,
        width: 2,
        height: 170
    },
    {
        x: 2760,
        y: 3640,
        width: 2,
        height: 170
    },
    {
        x: 2770,
        y: 3820,
        width: 190,
        height: 2
    },
    {
        x: 2960,
        y: 3640,
        width: 2,
        height: 170
    },
    {
        x: 200,
        y: 1000,
        width: 300,
        height: 800
    },
    {
        x: 700,
        y: 1000,
        width: 300,
        height: 800
    },
    {
        x: 0,
        y: 2000,
        width: 60,
        height: 20
    },
    {
        x: 200,
        y: 2000,
        width: 600,
        height: 20
    },
    {
        x: 0,
        y: 2000,
        width: 20,
        height: 1000
    },
    {
        x: 800,
        y: 2000,
        width: 20,
        height: 100
    },
    {
        x: 800,
        y: 2240,
        width: 20,
        height: 780
    },
    {
        x: 0,
        y: 3000,
        width: 60,
        height: 20
    },
    {
        x: 200,
        y: 3000,
        width: 420,
        height: 20
    },
    {
        x: 760,
        y: 3000,
        width: 40,
        height: 20
    },
    {
        x: 0,
        y: 2300,
        width: 300,
        height: 20,
    },
    {
        x: 300,
        y: 2000,
        width: 20,
        height: 200,
    },
    {
        x: 0,
        y: 2680,
        width: 300,
        height: 20,
    },
    {
        x: 300,
        y: 2800,
        width: 20,
        height: 200,
    },
    {
        x: 490,
        y: 2000,
        width: 20,
        height: 450,
    },
    {
        x: 490,
        y: 2600,
        width: 20,
        height: 420,
    },
    {
        x: 0,
        y: 2000,
        width: 800,
        height: 1000,
        alpha: 0.2
    },
    {
        x: 100,
        y: 3300,
        width: 800,
        height: 400
    },
]


// minimap setup
miniMapCanvas.width = width / 16;
miniMapCanvas.width = height / 16;
miniCtx.scale(1/16,1/16)
const miniMap = new Map(1/16,miniCtx)

// classes
const bulletsController = new BulletsController(1,ctx,mapObstacles)
// const player1 = new MainPlayer(posX,posY,canvas,mapObstacles,1,ctx,bulletsController)
const mainMap = new Map(1,ctx);

const update = ()=>{
    // if(!player1) update();
    if(killed){
        return;
    }
    requestAnimationFrame(update)
    ctx.clearRect(0,0,width*1,height*1) // clear the canvas for rerender
    miniCtx.clearRect(0,0,width*16,height*16) // clear the canvas for rerender
    mainMap.render(ctx,fighterImage,tank,rifle)
    miniMap.render(miniCtx,fighterImage,tank,rifle)
    player1.move(ctx);
    player1.draw(miniCtx)
    bulletsController.drawBullets()
    updatePlayers()
}

const updatePlayers = ()=>{
    // draw the players
    for(let playerID in players){
        console.log(playerID === player1.id)
        if(players[playerID].health === 0) continue;
        if(playerID === player1.id) continue
        // players[playerID].darw(ctx)
        players[playerID].update(players[playerID].x,players[playerID].y,players[playerID].health,players[playerID].degree,players[playerID].speed, player1.getPosition(),ctx)
    }
}


// update()

const killHandler = (player)=>{
    canvas.style.opacity = 0.5;
    const div = document.createElement("div");
    const msg = document.createElement("div");
    const respawn = document.createElement("div");
    msg.innerHTML = `You have been killed by ${player}`;
    let i = 3
    respawn.innerHTML = `Respawning in: ${i}`;
    setInterval(()=>{respawn.innerHTML = `Respawning in: ${--i}`;},1000);
    div.classList.add("killedDiv")
    msg.classList.add("msg");
    respawn.classList.add("respawn");
    div.appendChild(msg);
    div.appendChild(respawn);
    camera.appendChild(div);
    div.setAttribute("id","killedDiv")
    console.log(div)
    console.log(camera)
}

const respawnHandler = ()=>{
    console.log("respawning")
    console.log(camera.children)
    deleteChild(camera, 0, "killedDiv");
    canvas.style.opacity = 1;
    killed = false;
    let newPosX = player1.x =  respawn[player1.team].x;
    let newPosY = player1.y = respawn[player1.team].y;
    player1.left = 0
    player1.top = 0
    player1.updateLocation();
    console.log(newPosX, newPosY);
    // Adjust the Camera to be at the spawn place
    canvas.style.transform = `translate(${-(newPosX-camWidth/2)}px,${-(newPosY-camHeight/2)}px)`;
    canvas.style.left = `${0}px`;
    canvas.style.top = `${0}px`;
    update();  
}

const deleteChild = (parent, index, targetedChild)=>{
    console.log(parent.children[index])
    if(parent.children[index].id === targetedChild){
        parent.removeChild(parent.children[index]);
        return
    }
    return deleteChild(parent, index+1, targetedChild);
}

// const render = ()=>{ // to render the map    
//     // Make the map divs
//     for(let i=0;i<mapObstacles.length;i++){
//         ctx.fillStyle = "yellow";
//         ctx.fillStyle = "#554840";
//         ctx.fillStyle = "#98a163";
//         ctx.globalAlpha = mapObstacles[i].alpha || 1
//         ctx.shadowColor = "rgb(100,100,100)";
//         ctx.shadowColor = "#696969";
//         ctx.shadowOffsetX = 10;
//         ctx.shadowOffsetY = 10;
//         ctx.fillRect(mapObstacles[i].x,mapObstacles[i].y,mapObstacles[i].width,mapObstacles[i].height)
//     }
//     // Make map elements
//     for(let i=0;i<mapElements.length;i++){
//         ctx.shadowOffsetX = 0
//         ctx.shadowOffsetY = 0
//         ctx.globalAlpha = 1
//         if(mapElements[i].shape === "circle"){
//             ctx.fillStyle = mapElements[i].color;
//             ctx.beginPath()
//             ctx.arc(mapElements[i].x,mapElements[i].y,mapElements[i].radius,0,2 * Math.PI);
//             ctx.fill()
//             let repeatValue = mapElements[i].repeat;
//             while(repeatValue !== 0){
//                 console.log(mapElements[i].repeat)
//                 if(mapElements[i].repeatDir === "x"){
//                     ctx.arc(mapElements[i].x,mapElements[i].y,mapElements[i].radius,0,2 * Math.PI);
//                     ctx.fill()
//                 }else{
//                     ctx.arc(mapElements[i].x,mapElements[i].y,mapElements[i].radius,0,2 * Math.PI);
//                     ctx.fill()
//                 }
//                 repeatValue--;
//             }
//         }else if(mapElements[i].shape === "rectangle"){
//             ctx.fillStyle = mapElements[i].color;
//             ctx.fillRect(mapElements[i].x,mapElements[i].y,mapElements[i].width,mapElements[i].height);
//             let repeatValue = mapElements[i].repeat;
//             while(repeatValue !== 0){
//                 ctx.fillStyle = mapElements[i].color;
//                 if(mapElements[i].repeatDir === "x"){
//                     ctx.fillRect(mapElements[i].x+(mapElements[i].width+mapElements[i].distance)*repeatValue,mapElements[i].y,mapElements[i].width,mapElements[i].height)
//                 }else{
//                     ctx.fillRect(mapElements[i].x,mapElements[i].y+(mapElements[i].height+mapElements[i].distance)*repeatValue,mapElements[i].width,mapElements[i].height)
//                 }
//                 repeatValue--;
//             }
//         }
//         else{
//             ctx.strokeStyle = mapElements[i].color;
//             ctx.lineWidth = "10"
//             ctx.beginPath();
//             ctx.arc(mapElements[i].x, mapElements[i].y, mapElements[i].radius, 0, 2*Math.PI)
//             ctx.stroke();
//             let repeatValue = mapElements[i].repeat;
//             while(repeatValue !== 0){
//                 console.log(mapElements[i].repeat)
//                 if(mapElements[i].repeatDir === "x"){
//                     // ctx.fillRect(mapElements[i].x+(mapElements[i].width+mapElements[i].distance)*repeatValue,mapElements[i].y,mapElements[i].width,mapElements[i].height)
//                 }else{
//                     // ctx.fillRect(mapElements[i].x,mapElements[i].y+(mapElements[i].height+mapElements[i].distance)*repeatValue,mapElements[i].width,mapElements[i].height)
//                 }
//                 repeatValue--;
//             }
//         }
//     }
//     // Make the player
//     // playerCtx.fillStyle = "red"
//     // playerCtx.beginPath()
//     // playerCtx.arc(posX,posY,playerRadius,0,2 * Math.PI);
//     // playerCtx.fill()
//     // playerCtx.closePath()

//     // Add Images
//     ctx.drawImage(fighterImage,3200,150,270,210)
//     ctx.drawImage(fighterImage,2950,150,270,210)
//     ctx.drawImage(tank,2740,3650,240,180)
//     ctx.drawImage(tank,2140,3650,240,180)

//     // Add tergeting line
//     // rifleCtx.save()
//     // rifleCtx.beginPath()
//     // rifleCtx.translate(posX, posY);
//     // rifleCtx.strokeStyle = "rgb(158,154,117)"
//     // rifleCtx.strokeStyle = "#70899D"
//     // rifleCtx.strokeStyle = "#3E372C"
//     // // rifleCtx.strokeStyle = "red"
//     // // rifleCtx.setLineDash([10]);
//     // // rifleCtx.setLine();
//     // rifleCtx.lineWidth = 10
//     // rifleCtx.rotate(degree)
//     // rifleCtx.moveTo(0, 0);
//     // rifleCtx.lineTo(80, 0);
//     // rifleCtx.stroke()
//     // rifleCtx.restore()

//     // aiming
//     if(aim){
//         console.log("Aiming")
//         rifleCtx.save()
//         rifleCtx.beginPath()
//         rifleCtx.translate(posX, posY);
//         // rifleCtx.strokeStyle = "rgb(158,154,117)"
//         rifleCtx.strokeStyle = "#AF9B60"
//         rifleCtx.setLineDash([10]);
//         rifleCtx.lineWidth = 2
//         rifleCtx.rotate(degree)
//         rifleCtx.moveTo(80, 0);
//         rifleCtx.lineTo(1000, 0);
//         rifleCtx.stroke()
//         rifleCtx.restore()
//     }

//     // Shooting
//     if(shoot){
//     for(let bullet of bullets){
//         // console.log(bullet)
//         ctx.beginPath()
//         ctx.fillStyle = "yellow"
//         ctx.arc(bullet.x, bullet.y, 4, 0, 2 * Math.PI)
//         ctx.fill()
//     }
//     }
// }
