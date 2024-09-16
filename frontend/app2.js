import MainPlayer from "./classes/MainPlayer.js"
import Map from "./classes/Map.js";
import BulletsController from "./classes/BulletsController.mjs";
import Player from "./classes/Player.js";
import { getData, usersUrl, renderPlayers } from "./global.js";

// const socket = io("https://war-game-server.onrender.com");
const socket = io("http://localhost:3000/");
setTimeout(()=>{
    console.log(socket)
},1000)
let profile;
let player1;
let players = {}
let score = {
    "friendly-team":0,
    "enemy-team":0
}
const respawn = {
    1:{
        x: 50,
        y: 50,
    },
    2:{
        x: 100,
        y: 50
    }
}

socket.on("connect", ()=>{
    const room = sessionStorage.getItem("room") || null;
    const token = localStorage.getItem("token");
    if(token){
        getData(`${usersUrl}getProfile`, token).then(async response=>{
            const res = await response.json();
            console.log(res);
            profile = res.profile;
            if(res.success){
                if(room){
                    // socket.emit("askForRoomJoin", {room},(open)=>{
                        // if(open){
                            socket.emit("player_information", {id:profile.id, gamerTag: profile.ingame_name, rank:profile.player_rank, room: room, xp: profile.xp}, (roomPlayers)=>{
                                console.log("room assigned");
                                players = roomPlayers;
                                roomPlayers = Object.values(roomPlayers);
                                console.log(roomPlayers);
                                renderPlayers(document,players);
                                console.log("connected")
                            })
                        // }else{
                            // console.log("This room is already in game");
                            // alert("Cant't join this room.")
                            // window.location.href = "./home/home.html";
                            // return
                        // }
                    // })
                }
            }
        })
    }
    
})

socket.on("newPlayerConnects", player=>{
    console.log("new player", player);
    players[player.id] = player;
    renderPlayers(document,players);
    console.log(players)
})

socket.on("playerDisconnected", (disconnectedPlayer)=>{
    delete players[disconnectedPlayer];
    console.log(players);
    renderPlayers(document,players);
})

socket.on("startGame", (serverPlayers)=>{
    console.log("starting...")
    const me = serverPlayers[profile.id];
    console.log("meee",me)
    posX = respawn[me.team].x
    posY = respawn[me.team].y
    canvas.style.transform = `translate(${-(posX-camWidth/2)}px,${-(posY-camHeight/2)}px)`;
    player1 = new MainPlayer(me.id,me.gamerTag,posX,posY,me.xp,me.rank,me.team,canvas,mapObstacles,1,ctx,bulletsController,socket);
    for(let playerId in serverPlayers){
        if(playerId === profile.id) continue;
        const color = serverPlayers[playerId].team === me.team?"#0000ff":"red";
        const player = new Player(playerId, serverPlayers[playerId].gamerTag,respawn[serverPlayers[playerId].team].x, respawn[serverPlayers[playerId].team].y, 100, serverPlayers[playerId].team, color, ctx)
        players[playerId] = player;
    }
    renderTeams(document,players,me.team,update);
    updateScoreBoard();
})

socket.on("startingTimerDecrease",(c)=>{
    const timer = document.getElementById("game-start-timer");
    timer.innerHTML = `${c}`;
})

socket.on("begin",()=>{
    console.log("begin")
    matchmaking.classList.add("hidden")
    game.classList.remove("hidden")
    update();
})

const minutes = document.getElementById("mins")
const seconds = document.getElementById("secs")
socket.on("gameTimerCountDown",(mins,secs)=>{
    minutes.innerHTML = (mins <= 9)?`0${mins}`:`${mins}`;
    seconds.innerHTML = (secs <= 9)?`0${secs}`:`${secs}`;
})

socket.on("end",end);

socket.on("disconnect", ()=>{
    console.log("socket disconnected");
    window.location.reload();    
})

// new player connects to the game server
// socket.on("newPlayerConnects", (player)=>{
//     console.log(player.id,player);
//     const color = player.team === player1.team?"#0000ff":"red";
//     const newPlayer = new Player(player.id, player.position.x, player.position.y, 100, player.team, color,ctx)
//     players[player.id] = newPlayer;
// })

socket.on("updatePlayerState",(player)=>{ // when any player on the server state changes
    console.log("updating players now")
    players[player.id].x = player.position.x
    players[player.id].y = player.position.y
})

socket.on("updatePlayerDegree",(player)=>{ // when any player on the server state changes
    console.log("updating players now")
    players[player.id].degree = player.degree
})

socket.on("playerKilled", (shooter, killedPlayer, serverPlayers)=>{ // when a player is killed
    players[killedPlayer].health = 0;
    players[killedPlayer].killed = true;
    players[shooter].kills += 1;
    players[shooter].score += 10;
    players[killedPlayer].deaths += 1;
    updateScoreBoard(serverPlayers);
    if(killedPlayer == player1.id){
        // alert("You are killed by " + shooter);
        ctx.clearRect(0,0,width*1,height*1);
        killed = true
        killHandler(shooter)
    }
    if(shooter == player1.id){
        console.log("you killed", killedPlayer);
    }
    console.log(shooter, killedPlayer)
    updateScore(players[shooter],players[killedPlayer]);
})

socket.on("respawn", player=>{
    players[player].health = 100;
    players[player].killed = false;
    players[player].position = respawn[players[player].team];
    if(player == player1.id)
        respawnHandler()
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
        if(players[playerID].health === 0) continue;
        if(playerID == player1.id) continue
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

const startGame = ()=>{
    socket.emit("startGame");
}

const updateScoreBoard = (serverPlayers)=>{
    if(!serverPlayers) serverPlayers = players;
    const playersArr = Array.from(Object.values(serverPlayers));
    let friendlyTeam = [];
    let enemyTeam = Array();
    playersArr.forEach(player=>{
        if(player.team === player1.team) friendlyTeam.push(player);
        else enemyTeam.push(player);
    })
    friendlyTeam.sort((player1,player2)=>{
        if(player1.score >= player2.score) return -1;
        else return 1;
    })
    enemyTeam.sort((player1,player2)=>{
        if(player1.score >= player2.score) return -1;
        else return 1;
    })
    const friendlyScore = friendlyTeam.reduce((acc,curr)=>acc+curr.kills,0)
    const enemyScore = enemyTeam.reduce((acc,curr)=>acc+curr.kills,0)
    renderScoreBoard(friendlyTeam,enemyTeam,friendlyScore,enemyScore);
}

const friendsScore = document.getElementById("friends-score")
const friendsScoreDiv = document.getElementById("friends-score-div")
const enemiesScore = document.getElementById("enemies-score")
const enemiesScoreDiv = document.getElementById("enemies-score-div")

const updateScore = (killer, killed)=>{
    if(killer.team === player1.team){
        // score["friendly-team"] += 1;
        friendsScore.innerHTML = `${++score["friendly-team"]}`;
        console.log(+score["friendly-team"]/100);
        friendsScoreDiv.style.width = `${+score["friendly-team"]/50*100}%`;
        friendsScoreDiv.classList.remove('bg-transparent');
        friendsScoreDiv.classList.add('bg-blue-700');
    }else{
        enemiesScore.innerHTML = `${++score["enemy-team"]}`;
        enemiesScoreDiv.style.width = `${score["enemy-team"]/50*100}%`;
        enemiesScoreDiv.classList.remove('bg-transparent');
        enemiesScoreDiv.classList.add('bg-red-700');
    }
    if(score["friendly-team"] === 50 || score["enemy-team"] === 50) end();
}

const scoreBoard = document.getElementById("scoreboard");

addEventListener("keydown",(e)=>{
    console.log(e.key)  
    if(e.key === 'Shift'){
        scoreBoard.classList.remove("hidden");
    }
})

addEventListener("keyup",(e)=>{
    if(e.key === "Shift"){
        scoreBoard.classList.add("hidden");
    }
})

const friendlyTeamScoreBoard = document.getElementById("friendly-team-sb");
const enemyTeamScoreBoard = document.getElementById("enemy-team-sb");
const friendlyTeamScoreBoardScore = document.getElementById("friendly-team-scoreboard-score")
const enemyTeamScoreBoardScore = document.getElementById("enemy-team-scoreboard-score")

const renderScoreBoard = (friends,enemies,friendlyScore,enemyScore)=>{
    let friendlyTeam = "";
    let enemyTeam = "";
    console.log(friends);
    friends.forEach(player=>{
        friendlyTeam += `
            <div class="player-slot flex flex-row text-white w-full">
                <span class="basis-1/2">${player.gamerTag}</span>
                <div class="basis-1/2 flex flex-row justify-between">
                    <div class="text-center w-24">${player.score}</div>
                    <div class="text-center w-24">${player.kills}</div>
                    <div class="text-center w-24">${player.deaths}</div>
                </div>
            </div>
        `;
    })
    enemies.forEach(player=>{
        enemyTeam += `
            <div class="player-slot flex flex-row text-white w-full">
                <span class="basis-1/2">${player.gamerTag}</span>
                <div class="basis-1/2 flex flex-row justify-between">
                    <div class="text-center w-24">${player.score}</div>
                    <div class="text-center w-24">${player.kills}</div>
                    <div class="text-center w-24">${player.deaths}</div>
                </div>
            </div>
        `;
    })
    friendlyTeamScoreBoard.innerHTML = friendlyTeam;
    enemyTeamScoreBoard.innerHTML = enemyTeam;
    friendlyTeamScoreBoardScore.innerHTML = `${friendlyScore}`;
    enemyTeamScoreBoardScore.innerHTML = `${enemyScore}`;
}

function end (){ 
    const gameOver = document.getElementById("game-over");
    const bg = document.getElementById("bg")
    const ftBox = document.getElementById("friend-team-score-box");
    const etBox = document.getElementById("enemy-team-score-box");
    const goFriendScore = document.getElementById("friend-team-score-go")
    const goEnemyScore = document.getElementById("enemy-team-score-go")
    const goMessage = document.getElementById("go-message")
    const gameoverTeamsScore = document.getElementById("gameover-teams-score");
    const playerProgress = document.getElementById("player-progress");
    // const gameOverOptions = document.getElementById("gameover-options");
    bg.classList.remove("hidden")
    gameOver.classList.remove("hidden");
    setTimeout(()=>{
        gameoverTeamsScore.classList.remove("hidden");
        setTimeout(()=>{
            console.log(goFriendScore,score["friendly-team"])
            // gameOverOptions.classList.remove("hidden")
            goFriendScore.innerHTML = `${score["friendly-team"]}`;
            goEnemyScore.innerHTML = `${score["enemy-team"]}`;
            // ftBox.style.height = `${score["friendly-team"]}%`;
            // etBox.style.height = `${score["enemy-team"]}%`;
            ftBox.style.height = `50%`;
            etBox.style.height = `100%`;
            setTimeout(()=>{
                playerProgress.classList.remove("hidden");
            },1200);
        },100);
    },500)
    
    if(score["friendly-team"] > score["enemy-team"]){
        goMessage.innerHTML = "Your Team Wins!";
        goMessage.classList.add("text-blue-500")
        friendlyTeamScoreBoardScore.innerHTML = `
            ${score["friendly-team"]}
            <div class="flex flex-row items-center h-fit">
                <span class="text-blue-900">Winner</span>
                <span class="material-symbols-outlined text-blue-900">
                    military_tech
                </span>
            </div>
        `;
    }else if(score["friendly-team"] < score["enemy-team"]){
        goMessage.innerHTML = "Enemy Team Wins!";
        goMessage.classList.add("text-red-500")
        enemyTeamScoreBoardScore.innerHTML = `
            ${score["enemy-team"]}
            <div class="flex flex-row items-center h-fit">
                <span class="text-blue-900">Winner</span>
                <span class="material-symbols-outlined text-blue-900">
                    military_tech
                </span>
            </div>
        `;
    }else{
        goMessage.innerHTML = "Draw!";
        goMessage.classList.add("text-black")
    }
    console.log("player after end",player1);
    calculateRank(player1.id, player1.xp, player1.rank, player1.score);
}

const room = document.getElementById("room-players");
const startBtn = document.getElementById("startGameBtn"); 
const teams = document.getElementById("teams");
const friendsTeam = document.getElementById("friends-team") 
const enemyTeam = document.getElementById("enemy-team"); 
const matchmaking = document.getElementById("matchmaking");
const game = document.getElementById("game");

const renderTeams = (document,players, team, update) =>{
    room.classList.add("hidden");
    startBtn.classList.add("hidden");
    teams.classList.remove("hidden");
    let friends = ``;
    let enemies = ``;
    for(let player_id in players){
        console.log(player_id);
        console.log(players[player_id]);

        if(players[player_id].team === team){
            friends += `<div>${players[player_id].gamerTag}</div>`;
        }else enemies += `<div>${players[player_id].gamerTag}</div>`;
    }
    friendsTeam.innerHTML = friends;
    enemyTeam.innerHTML = enemies;
    let c = 1;
    const counter = setInterval(()=>{
        if(c === 0){
            clearInterval(counter);
            
        }
    },1000);
}

const calculateRank = (id,xp,rank,score)=>{
    let rem;
    const levelDiv = document.getElementById("level-div");
    const rankSpan = document.getElementById("rank-span");
    levelDiv.style.width = `${xp}%`;
    rankSpan.innerHTML = `Level ${rank}`;
    const levelUpInt = setInterval(()=>{
        levelDiv.style.width = `${xp}%`;
        rem = 100-xp;
        if(score === 0){
            clearInterval(levelUpInt);
        }
        setTimeout(()=>{
            if(score >= rem){ // Level Up
                // levelDiv.classList.add("transition-all", "duration-1000")
                levelDiv.style.transition = "all 0.7s";
                levelDiv.style.width = `100%`;
                score -= rem;
                xp = 0;
                setTimeout(()=>{
                    rankSpan.innerHTML = `Level ${++rank}`;
                    levelDiv.style.transition = "none";
                },710)
                // levelDiv.classList.remove("transition-all", "duration-1000")
            }else if(score < rem){
                // levelDiv.classList.add("transition-all", "duration-1000")
                levelDiv.style.transition = "all 0.7s";
                levelDiv.style.width = `${xp+score}%`;
                xp += score
                score = 0;
            }
        },500);
    },2300)
}

window.startGame = startGame;
