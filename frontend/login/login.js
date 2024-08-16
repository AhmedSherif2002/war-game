import { postData, usersUrl } from "../global.js"

const submitForm = (e)=>{
    e.preventDefault();
    const logginData = Object.fromEntries(new FormData(e.target));
    console.log(logginData);
    postData(`${usersUrl}login`,logginData).then(async res=>{
        if(res.status === 401){
            const response = await res.json();
            console.log("Invalid information")
            console.log(response);
        }
        if(res.status == 201){
            const response = await res.json();
            console.log("successfully logged in");
            localStorage.setItem("token", response.token);
            console.log(response);
            location.replace("../home/home.html");
        }
        
    })
}

// event binding
// const form = document.getElementById("loginForm");
// form.addEventListener("submit",submitForm)

// making submitForm funtion a global one.
window.submitForm = submitForm;
