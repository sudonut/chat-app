const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => {
  console.log("Listening on port 3000..");
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/public", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/index.html"));
})

app.post("/api", (req, res) => {
  console.log(req.body);
})



// const http = require("http");

// const server = http.createServer((req, res) => {

//   res.setHeader("Content-type", "application/json");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.writeHead(200); //status code HTTP 200 / OK

//   let dataObj = {"id": 244, "name":"Time", "email":"time@gmail.com"};
//   let data = JSON.stringify(dataObj);
//   res.end(data);
// });

// server.listen(1234, () => {
//   console.log("Listening on port 1234");
// });

