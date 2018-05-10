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
let connections = [];
console.log('RESTful API server started on: ' + port);
io.on('connection', (socket)=>{
    connections.push(socket);
    console.log('Clients connected ', connections.length);

    //disconnect
    socket.on('disconnect', (data)=>{
        connections.splice(connections.indexOf(socket), 1);
        console.log('Clients connected ', connections.length);
    });
    socket.on('send message', (data) => {
        io.sockets.emit('new message', {msg: 'siemka z servera'})
    })
    socket.on('new user', (user) => {
        console.log(' new user connected ', user);
    })
});
module.exports = app;
