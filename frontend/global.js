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




export {
    usersUrl,
    roomsUrl,
    getData,
    postData,
    renderPlayers,
}