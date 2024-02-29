const express = require('express');
const {createServer} = require("http")
const { Server } = require("socket.io")
const cors = require('cors');

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000' : 'https://real-time-drawing-tool-frontend.vercel.app/'

app.use(cors({origin: 'http://localhost:3000'}))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL});

io.on("connection", (socket) => {
  console.log("server connected")
  
  //if i am sender so changes done by other clients not me so that's why i am using emit 
  socket.on('beginPath', (arg)=>{
     socket.broadcast.emit('beginPath', arg)
  })

  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine', arg)
  })
  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig', arg)
  })

});

httpServer.listen(8000);