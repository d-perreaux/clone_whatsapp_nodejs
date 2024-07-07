const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require("socket.io")(server)

//middleware
app.use(express.json());
var clients = {};

io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "has joined");
    socket.on("signing", (id) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });

    socket.on("message", (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        if(clients[targetId])
        clients[targetId].emit("message", msg);
    });
})

server.listen(port, "0.0.0.0", ()=> {
    console.log("server started");
})