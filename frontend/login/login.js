const apiUrl = "http://localhost:4000/users/";

function submitForm(e){
    e.preventDefault();
    const logginData = Object.fromEntries(new FormData(e.target));
    console.log(logginData);
    postData(`${apiUrl}login`,logginData).then(async res=>{
        if(res.status === 401){
            const response = await res.json();
            console.log("Invalid information")
            console.log(response);
        }
        if(res.status == 201){
            const response = await res.json();
            console.log("successfully logged in");
            localStorage.getItem("token", response.token);
            console.log(response);
            location.replace("../home/home.html");
        }
        
    })
}

const postData = async (url,data)=>{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    })
    return response;
}