const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const fisheaterWrapper = require('./fisheaterWrapper')

app.use(express.static(path.join(__dirname,'public')))

server.listen(80, () => {
    console.log('listening to 80')
})

io.on('connection', (socket) => {
    socket.on('uploadRequest', (uploadRequest) => {
        fisheaterWrapper.upload(uploadRequest, (typeOfUpdate, content) => {
            socket.emit(typeOfUpdate, content)
        })
    })
})