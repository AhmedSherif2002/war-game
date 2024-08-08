const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 4000;
const { usersRouter } = require("./routes/usersRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'*'
}))
app.use("/users/", usersRouter);

app.listen(port ,()=>{
    console.log("Server is running on port", port)
})

app.get("/",(req,res)=>{
    res.send("app")
})

