const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/public", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected!");
  socket.on("disconnect", () => {
    console.log("User disconnected...")
  })
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  })
})

server.listen(3000, () => {
  console.log("Listening on port 3000..");
});
