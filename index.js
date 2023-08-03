const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let users = {};
const port = process.env.PORT || 5000;


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

server.listen(port, () => {
  console.log(`server is listening at port : ${port}`);
});