const { createNewRoom } = require("../models/roomsModel.js");

const createRoom = (req, res)=>{
    const user_id = req.id;
    createNewRoom(user_id, (err, result)=>{
        console.log(result);
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

module.exports = {
    createRoom
}