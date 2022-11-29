const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { Server } = require('socket.io')
const { createServer } = require('http')

// require('./db.js');

const server = express();
const cors = require('cors');
const { Client } = require('./db.js');
server.name = 'API';

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const serverHttp = createServer(server);
const io = new Server(serverHttp, {
  cors: {
    header: '*'
  }
})

let roomArr = [];
let adm = [];
let userConnect = [];



io.on('connection', (socket) => {
  socket.on('userConected', (obj) => {
    Client.update({ con: "Connected" }, { where: { email: obj.user } })
    if (obj.rol == 'menu-admin') {
      adm[0] = { id: socket.id, user: obj.user, rol: obj.rol }
    } else if (obj.rol == 'menu-client') userConnect.push({ id: socket.id, user: obj.user })
    if (adm.length) io.to(adm[0].id).emit('newUserLogin', 'xd')
    console.log(userConnect)
  })

  socket.on('userDisconect', (data) => {
    Client.update({ con: 'Disconnected' }, { where: { email: data } })
    if (adm.length) io.to(adm[0].id).emit('newUserLogin', 'xd')
  })

  socket.on('userBanned', (obj) => {
    Client.update({ status: obj.state }, { where: { email: obj.user } })
    socket.emit("newUserLogin", 'xd')
    const filtro = userConnect.filter((e) => e.user == obj.user)
    filtro.map((e) => {
      io.to(e.id).emit('userBanned', obj.state)
    })
    userConnect = userConnect.filter((e) => e.user != obj.user)
  })

  socket.on('roomView', (roomID) => {
    socket.join(roomID)
    const filter = roomArr.filter((e) => e.id == roomID);
    if (!filter.length) roomArr.push({ id: roomID, status: true })
    const result = roomArr.filter((e) => e.id == roomID);
    io.to(roomID).emit('payRoom', result[0]);
  })

  socket.on('userPayRoom', (roomID, userEmail) => {
    roomArr.map((e) => { if (e.id == roomID) e.status = false })
    const result = roomArr.filter((e) => e.id == roomID);
    result[0].user = userEmail;
    io.to(roomID).emit('userPay', result[0]);
  })

  socket.on('cancelPay', (roomID) => {
    roomArr.map((e) => { if (e.id == roomID) e.status = true })
    const result = roomArr.filter((e) => e.id == roomID);
    io.to(roomID).emit('userPayC', result[0]);

  })
})


module.exports = serverHttp;