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

// document.getElementById("createRoomBtn").addEventListener("click",createRoom);

window.createRoom = createRoom;