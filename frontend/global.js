const usersUrl = "http://localhost:4000/users/";
const roomsUrl = "http://localhost:4000/rooms/";

async function getData(url,token=null){
    if(!token){
        const response = await fetch(url, {
            headers: {
                "Content-Type":"application/json",
            }
        })
        return response;
    }

    const response = await fetch(url, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return response;
}

const postData = async (url,data,token=null)=>{
    if(token){
        if(data){
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            return response;
        }else{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            return response;
        }
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    })
    return response;
}

const renderPlayers = (document,players)=>{
    const playersDiv = document.getElementById("players");
    players = Object.values(players);    
    let toInsert = "";
    players.forEach(player => {
        // document.createChild()
        toInsert += `
            <div class="player flex flex-row justify-between p-2 bg-emerald-800 text-white text-xl font-semibold cursor-pointer hover:bg-emerald-600 hover:text-white">
                <span class="">${player.gamerTag}</span>
                <span>${player.rank}</span>
            </div>
        `
    });
    playersDiv.innerHTML = toInsert;
    console.log(playersDiv);
}

const renderTeams = (document,players, team, update) =>{
    const room = document.getElementById("room-players");
    const startBtn = document.getElementById("startGameBtn"); 
    const teams = document.getElementById("teams");
    const friendsTeam = document.getElementById("friends-team") 
    const enemyTeam = document.getElementById("enemy-team");
    const timer = document.getElementById("game-start-timer"); 
    const matchmaking = document.getElementById("matchmaking");
    const game = document.getElementById("game");
    let c = 2;
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
    const counter = setInterval(()=>{
        timer.innerHTML = `${--c}`;
        if(c === 0){
            clearInterval(counter);
            matchmaking.classList.add("hidden")
            game.classList.remove("hidden")
            update();
        }
    },1000);
}

export {
    usersUrl,
    roomsUrl,
    getData,
    postData,
    renderPlayers,
    renderTeams
}