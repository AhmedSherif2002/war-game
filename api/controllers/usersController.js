const { createUser } = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const register = (req,res)=>{
    const user = req.body
    createUser(user , (err, results)=>{
        if(err){
            console.log(err);
            res.status(401).json({
                success: 0,
                message: err.message 
            })
            return;
        }
        console.log("res", results);
        token = jwt.sign({ id:results.insertId }, "secret");
        console.log(token)
        res.status(201).send({
            success: 1,
            message: "User was successfully created.",
            token
        });
    })
}

module.exports = {
    register
}