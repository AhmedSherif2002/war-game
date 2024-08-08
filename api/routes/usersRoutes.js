const express = require("express");
const usersRouter = express.Router();
const { register } = require("../controllers/usersController.js")
usersRouter.get("/", (req,res)=>{
    console.log("user router");
    res.send("hello users");
})

usersRouter.post("/register", register);

module.exports = {
    usersRouter
}