import express from 'express';
import bodyParser from 'body-parser';
import cors from  'cors';
import path from  'path';
import logger from  'morgan';
import config from  './config'; // // get our config file
import Swagger from './services/swagger.service';
import {swaggerRoute, userRouter, taskRouter,homeRouter,shareTaskRouter} from './routers/index.routing';
import http from 'http';
import socketIo from 'socket.io';
const port = process.env.PORT || 3000;
let swagger = new Swagger();
let app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);
app.use(cors());
app.use(bodyParser.json({limit: '1mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '1mb'
}));

// mongoose.connect('mongodb://localhost/logletter_database'); // connect to database
app.set('superSecret', config.secret); // secret variable

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static('images/profiles'));
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/shareTask',shareTaskRouter),
app.use('', homeRouter);


// Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));
app.use('/swagger', swaggerRoute);

server.listen(port);

console.log('RESTful API server started on: ' + port);

//socket

//users
let users = [];
let connections = [];

io.on('connection', (socket)=>{
    connections.push(socket);
    console.log('Clients connected ', connections.length);
    socket.msgs = [];
    //disconnect
    socket.on('disconnect', (data)=> {
        console.log('client disconnected');
        users.splice(users.indexOf(socket.username));
        connections.splice(connections.indexOf(socket), 1);
        io.sockets.emit('users', users);
        // console.log('Clients connected ', connections.length);
    });
    socket.on('send message', (data) => {
        socket.msgs.push(data);
        socket.emit('history', socket.msgs);
        console.log(data);
        //loop through connections
        for(let i = 0; i < connections.length; i++){
            console.log('in da loop');
            if(connections[i].username === data.receiver){
                connections[i].emit('receive', data);
                connections[i].msgs.push(data);
                connections[i].emit('history',  connections[i].msgs);

                console.log('we should send msg to ', connections[i].username)
            }
        }
        // io.sockets.emit('new message', {msg: 'siemka z servera'})
    });


    socket.on('new user', (user) => {
        console.log(' new user connected ', user);
        socket.username = user;
        if(!checkIfUserAdded(socket.username))
            users.push(socket.username);
            io.sockets.emit('users', users);
    })

});

function checkIfUserAdded(username){
    for(let i = 0; i<users.length; i++){
        if(users[i] === username){
            return true;
        }
    }
    return false;
}
module.exports = app;
