const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

io.on('connection', (socket) => {
  console.log('a user connected');

  // console.log(socket);

  socket.emit("serverMsg", "Hey I am server");

  socket.on("name", (name) => {
    console.log(name);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

});

http.listen(3000, () => {
  console.log('listening on port : 3000');
});