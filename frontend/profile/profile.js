import { getData, usersUrl } from "../global.js";



window.onload = async ()=>{
    const token = localStorage.getItem("token") || null;
    console.log(token)
    if(!token) return;
    getData(`${usersUrl}getProfile`, token).then(async response=>{
        if(response.status !== 201) return;
        const res = await response.json();
        console.log(res);
        const user = res.profile;
        const profile = document.getElementById("profile");
        const notLoggedInElement = document.getElementById("notLoggedIn");
        profile.classList.remove("hidden");
        notLoggedInElement.classList.add("hidden");
        const profileAttributes = document.getElementById("profileLeftCol");
        const profileData = document.getElementById("profileRightCol");
        profileAttributes.innerHTML = `
            <span>Name:</span>
            <span>Rank:</span>
            <span>Wins:</span>
            <span>Loses:</span>
            <span>Kills:</span>
            <span>Deaths:</span>
            <span>k/d ratio:</span>
            <span>w/l ratio:</span>
            <span>Games played:</span>
            <span>Hours:</span>
            <span>Status:</span>
        `;
        profileData.innerHTML = `
            <span>${user.first_name} ${user.last_name}</span>
            <span>${user.player_rank}</span>
            <span>${user.wins}</span>
            <span>${user.loses}</span>
            <span>${user.kills}</span>
            <span>${user.deaths}</span>
            <span class="text-emerald-500">${user.kd_ratio}</span>
            <span class="text-emerald-500">${user.wl_ratio}</span>
            <span>${100}</span>
            <span>100</span>
            <span class="${user.currently_online?"text-emerald-500":"text-slate-500"}">${user.currently_online?user.currently_in_game?"Online | In-Game":"Online":"Offline"}</span>
        `
        
    })
}

const copy = (copyBtn)=>{
    const playerTag = document.getElementById("playerTag");
    navigator.clipboard.writeText(playerTag.innerText);
    console.log(copyBtn)
    copyBtn.innerHTML = `&#10003;`
}

window.copy = copy;
