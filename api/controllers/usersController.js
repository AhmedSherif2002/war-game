const register = (req,res)=>{
    const user = req.body
    console.log(user)
    res.send(user)
}

module.exports = {
    register
}