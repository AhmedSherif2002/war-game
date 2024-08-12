const { createUser,validateUser,getUserInfo } = require("../models/usersModel");
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

const login = (req, res)=>{
    const user = req.body;
    validateUser(user, (err, results)=>{
        if(err){
            console.log(err);
            res.status(401).json({
                success: 0,
                message: "Invalid email or password"
            })
            return;
        }
        const token = jwt.sign({ id:results.id }, "secret");
        console.log("successful",results)
        res.status(201).json({
            success: 1,
            message: "login was successful",
            token: token
        })
    })
}

const getProfile = (req, res)=>{
    const user_id = req.id;
    getUserInfo(user_id, (err, result)=>{
        console.log(err)
        if(err){
            return res.status(401).json({
                success: 0,
                message: "database error"
            })
        }
        res.status(201).json({
            success: 1,
            profile: result
        })
        console.log(result.id)
    })
}

module.exports = {
    register,
    login,
    getProfile
}