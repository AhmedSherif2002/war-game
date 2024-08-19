import { getData, usersUrl, roomsUrl, postData } from "../global.js";
 
const profile1 = document.getElementById("profile-span1")
const profile2 = document.getElementById("profile-span2")

window.onload = ()=>{
    const token = localStorage.getItem("token") || null
    if(!token) return;
    getData(`${usersUrl}getProfile`, token).then(async response=>{
        if(response.status !== 201) return;
        const res = await response.json();
        console.log(res);
        profile2.firstChild.innerHTML = `${res.profile.first_name}`; 
    }).catch(err=>console.log(err));
}

setInterval(()=>{
    if(profile1.style.left === "-100%"){
        profile1.style.left = "0%"
        profile2.style.left = "100%"
    }else{
        profile1.style.left = "-100%"
        profile2.style.left = "0%"
    }
},3000)


const createRoom = function(){
    const token = localStorage.getItem("token") || null
    if(!token) return;
    postData(`${roomsUrl}createRoom`, null, token).then(async res=>{
        const response = await res.json();
        console.log(response);
        if(response.success){
            sessionStorage.setItem("room", response.room_number);
            window.location.href = "../index.html";
        }
    })
}

const joinRoom = ()=>{
    const token = localStorage.getItem("token") || null;
    const roomIdEle = document.getElementById("roomId");
    const roomId = roomIdEle.value;
    if(!token) return;
    postData(`${roomsUrl}joinRoom`, { roomId }, token).then(async res=>{
        const response = await res.json();
        console.log(response);
        if(response.success){
            sessionStorage.setItem("room", response.room_number);
            window.location.href = "../index.html";
        }else{
            document.getElementById("roomNotFoundWarning").classList.remove("hidden");
        }
    })
}

const openDialogue = (button)=>{
    console.log(button)
    if(button.id === "privateGame"){
        document.getElementById("privategame-dialogue").classList.remove("hidden");
        const bg = document.getElementById("bg")
        bg.classList.remove("hidden");
        bg.addEventListener("click",()=>{
            document.getElementById("privategame-dialogue").classList.add("hidden");
            bg.classList.add("hidden");
        })
    }
}

// document.getElementById("createRoomBtn").addEventListener("click",createRoom);

window.createRoom = createRoom;
window.joinRoom = joinRoom;
window.openDialogue = openDialogue;