const jwt = require("jsonwebtoken");

const validateUser = (req,res,next)=>{
    const token = req.headers.authorization.substring('Bearer '.length) || null;
    if(!token){
        res.status(401).json({
            success: 1,
            message: "not signed in"
        })
    }
    const user = jwt.verify(token, "secret");
    req.id = user.id;
    next();
}

module.exports = {
    validateUser
}