const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const { isExistUser, getAllUsers, deleteUser, addUsersData } = require("./helpToolUser");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});
const PORT = process.env.PORT || 3001

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

io.on("connection", (socket) => {

    console.log(`UserId ${socket.id}`);

    socket.on('joinRoom', (data) => {
        socket.join(`${data.room}`)
    })

    socket.on('roomIn', (data) => {
        const isExist = isExistUser(data)
        if (!isExist) {
            addUsersData(data, socket.id)
            socket.to(`${data.room}`).emit('message', {user: 'Admin', message: `${data.username} has join !`})
        } 
        const userList = getAllUsers(data.room)
        socket.emit('message', {user: 'Admin', message: `Welcome ${data.username}`})
        io.in(`${data.room}`).emit('roomData', { userList })
    })

    socket.on('sendMessage', (data) => {
        io.in(`${data.room}`).emit('message', {user: data.username, message: data.message})
    })

    socket.on('disconnect', () => {
        console.log(`UserId ${socket.id} has disconnect !!`);
        const {usersData, room, username} = deleteUser(socket.id)
        io.in(`${room}`).emit('roomData', { userList: usersData })
        socket.to(`${room}`).emit('message', {user: 'Admin', message: `${username} has Left !`})
    })
});

server.listen(PORT, () => {
    console.log('Server connect successful !!')
});