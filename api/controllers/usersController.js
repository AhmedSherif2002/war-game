const { createUser,validateUser,getUserInfo } = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const register = (req,res)=>{
    const user = req.body
    createUser(user , (err, results)=>{
        if(err){
            res.status(401).json({
                success: 0,
                message: err.message 
            })
            return;
        }
        token = jwt.sign({ id:results.insertId }, "secret");
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
            res.status(401).json({
                success: 0,
                message: "Invalid email or password"
            })
            return;
        }
        const token = jwt.sign({ id:results.id }, "secret");
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
    })
}

module.exports = {
    register,
    login,
    getProfile
}