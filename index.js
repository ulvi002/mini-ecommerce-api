const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const http = require("http")
const { Server } = require("socket.io")

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app)

const io = new Server(server)

io.on("connection", (socket) => {
  console.log("User connected", socket.id)

  socket.on("message", (msg) => {
    console.log("Message", msg)

    io.emit("message", msg)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id)
  })

  
})

mongoose.connect(MONGO_URL)
.then( () => {
    console.log("MongoDB connected")

    server.listen(PORT, () => {
        console.log(` Server running on port ${PORT} `);
    })
})
  .catch((err) => {
    console.error(" MongoDB connection errror", err)
  })

