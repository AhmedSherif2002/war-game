const apiUrl = "http://localhost:4000/users/";

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

    postData(`${apiUrl}register`,user).then(async response=>{
        const res = await response.json();
        console.log(res);
    })
}


const postData = async (url,data)=>{
    const response = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    })
    return response;
}