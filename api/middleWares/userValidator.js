const jwt = require("jsonwebtoken");

const validateUser = (req,res,next)=>{
    console.log(req.headers);
    const token = req.headers.authorization.substring('Bearer '.length) || null;
    console.log(token)
    if(!token){
        res.status(401).json({
            success: 1,
            message: "not signed in"
        })
    }
    const user = jwt.verify(token, "secret");
    console.log(user.id);
    req.id = user.id;
    next();
}

module.exports = {
    validateUser
}