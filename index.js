const express = require("express");
const app = express();

let users = {};

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {

  socket.on("join", name => {
    users[socket.id] = name;
    socket.broadcast.emit("messageBack", `${name} joined the chat...`);
  });

  socket.on("message", msg => {
    socket.broadcast.emit("messageBack", `${users[socket.id]} : ${msg}`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("logout", `${users[socket.id]} left the chat...`);
  });
});

server.listen(5000, () => {
  console.log("server is listening at port : 5000");
});