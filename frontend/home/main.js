const profile1 = document.getElementById("profile-span1")
const profile2 = document.getElementById("profile-span2")

setInterval(()=>{
    if(profile1.style.left === "-100%"){
        profile1.style.left = "0%"
        profile2.style.left = "100%"
    }else{
        profile1.style.left = "-100%"
        profile2.style.left = "0%"
    }
},3000)