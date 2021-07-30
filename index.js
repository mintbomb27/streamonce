const express = require('express')

const uniqid = require('uniqid')
const bodyParser = require('body-parser');
const path = require('path');

const app = express()

//WebSocket
const { Server } = require('socket.io');
const server = require('http').createServer(app)
const io = new Server(server, {
    cors: '*'
});

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

io.on('connection', (socket) =>{
    console.log(`${socket.id} is Connected`)
    socket.on('create-room', () => {
        var room = uniqid('room-')
        socket.join(room)
        console.log(`Room ${room} created by ${socket.id}`)
        io.to(room).emit('announce-room',room)
        socket.on('control', (control) => {
            console.log(`Received control for ${room}: ${control}`)
            socket.to(room).emit('control',control)
        })
    })
    socket.on('join-room', (room) => {
        socket.join(room)
        console.log(`${socket.id} joined ${room}`)
    })
})

app.get('/admin',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/admin.html'));
  });
app.get('/client',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/client.html'));
  });
app.get('/:goTo',function(req,res) {
    res.sendFile(path.join(__dirname+`/views/${req.params.goTo}`));
  });
  

app.use((req, res) => {
    res.status(400).json("Invalid API request");
})

module.exports.io = io
const port = process.env.PORT || 4000
server.listen(port, () => console.log(`Server started on port ${port}`))