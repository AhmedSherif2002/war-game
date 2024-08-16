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

export {
    usersUrl,
    roomsUrl,
    getData,
    postData,
}