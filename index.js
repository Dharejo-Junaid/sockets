const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  console.log("User is connected");

  socket.on("message", msg => {
    console.log("User msg = ", msg);

    socket.emit("messageBack", "Hi I am server.");
  });
});

server.listen(5000, () => {
  console.log("server is listening at port : 5000");
});