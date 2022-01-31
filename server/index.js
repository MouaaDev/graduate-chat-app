const express = require("express")
const app = express()
const httpServer = require("http").createServer(app)
const path = require("path")

const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
})

app.use(express.static(path.join(__dirname, "client")))

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("message", (message) => {
    console.log(message)
    io.emit("message", message)
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected")
  })
})

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () =>
  console.log(`listening on http://localhost:${PORT}`)
)
