require("dotenv").config()

// express config modules
const express = require("express")
const app = express()
const port = process.env.PORT

// socket config modules
const server = require("http").createServer(app)
const io = require("socket.io")(server)

// local modules
const router = require("./router")
const errorHandler = require("./error_handlers")

app.use(express.json())
app.use(router)
app.use(errorHandler)

io.on("connection", (client) => {
    console.log(client)
})

server.listen(port, () => {
    console.log(`server listen to ${port}`)
})