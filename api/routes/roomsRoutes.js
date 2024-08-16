const express = require("express");
const roomsRouter = express.Router();
const { validateUser } = require("../middlewares/userValidator.js")
const { createRoom } = require("../controllers/roomsController.js")

roomsRouter.get("/", (req,res)=>{
    console.log("rooms router");
    res.send("hello rooms");
})

roomsRouter.post("/createRoom", validateUser, createRoom)

module.exports = {
    roomsRouter
}