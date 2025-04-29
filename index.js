const http= require("http")
const express= require("express")
const path = require("path")
const app= express();
const {Server}= require("socket.io") 
const server = http.createServer(app)

require('dotenv').config();
app.use(express.static(path.resolve("./public")));
const io = new Server(server);
// socket.io on differnt connection
io.on("connection",(socket)=>{
console.log("user connected");
socket.on("message",(data)=>{
    console.log(data);
    socket.broadcast.emit("message",data);
})

})



app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html");
})

server.listen(process.env.port ,()=>{
    console.log(`server is connected of port ${process.env.port}`)
})

