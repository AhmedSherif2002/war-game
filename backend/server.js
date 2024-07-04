const express = require("express")
const cors = require("cors");
const {join} = require("path")

const app = express();
app.use(express.static('../frontend'))
app.listen(4000,()=>{
    console.log("server is sunning on port", 4000)
})

app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"../frontend/index.html"))
})