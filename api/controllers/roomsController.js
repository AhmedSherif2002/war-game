const { createNewRoom, join } = require("../models/roomsModel.js");

const createRoom = (req, res)=>{
    const user_id = req.id;
    createNewRoom(user_id, (err, result)=>{
        if(err){
            res.status(400).json({
                success: 0,
                message: "database error"
            })
            return
        }
        res.status(200).json({
            success: 1,
            message: "Room was created",
            room_number: result.insertId
        })
    })
}

const joinRoom = (req,res)=>{
    const userId = req.id;
    const { roomId } = req.body;
    join(userId, roomId, (err, result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                success: 0,
                message: err.message
            })
        }
        res.status(200).json({
            success: 1,
            message: "You have successfully joined the room",
            room_number: roomId
        })
    })
}

module.exports = {
    createRoom,
    joinRoom
}