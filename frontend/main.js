const profile1 = document.getElementById("profile-span1")
const profile2 = document.getElementById("profile-span2")

setInterval(()=>{
    if(profile1.style.left === "-100%"){
        profile1.style.left = "50%"
        profile2.style.left = "150%"
    }else{
        profile1.style.left = "-100%"
        profile2.style.left = "50%"
    }
},3000)