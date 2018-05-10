import express from 'express';
import bodyParser from 'body-parser';
import cors from  'cors';
import path from  'path';
import logger from  'morgan';
import config from  './config'; // // get our config file
import Swagger from './services/swagger.service';
import mongoSanitize from  'express-mongo-sanitize';
import {swaggerRoute, userRouter, taskRouter,homeRouter,shareTaskRouter} from './routers/index.routing';


const port = process.env.PORT || 3000;
let swagger = new Swagger();
let app = express();

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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static('images/profiles'));
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/shareTask',shareTaskRouter),
app.use('', homeRouter);
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(mongoSanitize());
//
// app.use('/', routes);

// app.use(function (req, res, next) {
//
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//     // decode token
//     if (token) {
//
//         // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 return res.json({success: false, message: 'Failed to authenticate token.'});
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

// Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));
app.use('/swagger', swaggerRoute);

app.listen(port);
console.log('RESTful API server started on: ' + port);
module.exports = app;
