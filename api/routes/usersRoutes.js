const express = require("express");
const usersRouter = express.Router();
const { register,login,getProfile } = require("../controllers/usersController.js")
const { validateUser } = require("../middlewares/userValidator.js")

usersRouter.get("/", (req,res)=>{
    console.log("user router");
    res.send("hello users");
})

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/getProfile", validateUser, getProfile);

module.exports = {
    usersRouter
}