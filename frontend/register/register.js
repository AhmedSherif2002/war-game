import { postData, usersUrl } from "../global.js"

function submitForm(e){
    e.preventDefault();
    console.log(e.target);
    const form = new FormData(e.target)
    const user = Object.fromEntries(form);
    console.log(user)
    console.log(Object.keys(user))
    let warningFlag = false;
    // if input is empty => warn the user
    const warning = document.getElementById("warningParagraph")
    Object.keys(user).forEach(key=>{ 
        const emptyEl = document.getElementById(key)
        if(user[key] === ""){
            emptyEl.style.borderColor = "red";
            console.log(key,"is empty")
            console.log(warning)
            warningFlag = true;
        }else{
            emptyEl.style.borderColor = "";
        } 
    })
    warningFlag?warning.classList.remove("hidden"):warning.classList.contains("hidden")?"":warning.classList.add("hidden");
    if(warningFlag) return;
    // check password compatibility
    const pswdWarning = document.getElementById("passwordWarningParagraph");
    if(user["password"] !== user["confirm-password"]){
        const pswd = document.getElementById("password")
        const confPswd = document.getElementById("confirm-password")
        pswd.style.borderColor = "red"
        confPswd.style.borderColor = "red"
        pswdWarning.classList.contains("hidden")?pswdWarning.classList.remove("hidden"):"";
        console.log("Passwords are incompatible");
        return;
    }else{
        pswdWarning.classList.contains("hidden")?"":pswdWarning.classList.add("hidden");
    }

    postData(`${usersUrl}register`,user).then(async response=>{
        const res = await response.json();
        console.log(res);
        if(!res.success){
            if(res.message === "This email is already used"){
                const emailWarning = document.getElementById("emailWarningParagraph");
                const email = document.getElementById("email");
                emailWarning.classList.remove("hidden");
                email.style.borderColor = "red";
            }
            if(res.message === "This gamer tag is already used"){
                const gamertagWarning = document.getElementById("gamertagWarningParagraph");
                const gamertag = document.getElementById("gamertag");
                gamertagWarning.classList.remove("hidden");
                gamertag.style.borderColor = "red"
            }
            return;
        }
        localStorage.setItem("token", res.token);
        window.location.href = "../home/home.html";
    })
}


window.submitForm = submitForm

