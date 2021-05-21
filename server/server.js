const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const dbName = null
const dbPass = null

let connectionString =
  `mongodb+srv://${dbName}:${dbPass}@cluster0.r4g8r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  // Send data to the database when the user sends a messgae
MongoClient.connect(`${connectionString}`, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database!");
    const db = client.db("chat-app-messages");
    const messageCollection = db.collection("messages");
    db.collection("messages")
      .find()
      .toArray()
      .then((data) => {
        console.log(data);
      });
    app.post("/server/server.js", (req, res) => {
      messageCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => {
    console.error(error);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


io.on("connection", (socket) => {
  console.log("A user connected!");
  socket.on("disconnect", () => {
    console.log("User disconnected...")
  })
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  })
})

app.use("/public", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/index.html"));
});

server.listen(3000, () => {
  console.log("Listening on port 3000..");
});
