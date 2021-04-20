require("dotenv").config()

// express config modules
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT

// socket config modules
const server = require("http").createServer(app)
const io = require("socket.io")(server, {cors: {origin: process.env.CLIENT_URL}})

// local modules
const router = require("./router")
const errorHandler = require("./error_handlers")
const { Socket } = require("dgram")

app.use(cors({origin: process.env.CLIENT_URL}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

io.on("connection", (client) => {
    client.on("send message", (chats) => {
        client.broadcast.emit("other sent message", chats)
    })
})

server.listen(port, () => {
    console.log(`server listen to ${port}`)
})