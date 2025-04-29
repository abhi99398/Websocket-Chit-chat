const http= require("http")
const express= require("express")
const path = require("path")
const app= express();
const {Server}= require("socket.io") 
const server = http.createServer(app)
require('dotenv').config();

app.use(express.static(path.resolve("./public")));
const io = new Server(server);

// socket.io on differnt events/connections

io.on("connection",(socket)=>{
   socket.on('User-message',(message)=>{

    io.emit('server-messages',message);
   })

});


// get request for serving  html file
app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html");
})

server.listen(process.env.port ,()=>{
    console.log(`server is connected of port ${process.env.port}`)
})

