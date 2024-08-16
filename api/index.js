const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = 4000;
const { usersRouter } = require("./routes/usersRoutes");
const { roomsRouter } = require("./routes/roomsRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}))
app.use(cookieParser());

app.use("/users/", usersRouter);
app.use("/rooms/", roomsRouter);

app.listen(port ,()=>{
    console.log("Server is running on port", port)
})

app.get("/",(req,res)=>{
    res.send("app")
})

