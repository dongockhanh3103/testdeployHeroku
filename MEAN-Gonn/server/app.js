const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
//port local
//const port = 3000;

//port heroku
const port = process.env.PORT||3000;
const app = express();
var ingredient=require('./routes/ingredientRouters')(router);
const authentication=require('./routes/authentication')(router);
const session = require('express-session');
const passport = require('passport');
const social= require('./passport/passport')(app,passport);
const foodRouter = require('./routes/foodRoutes.js');  
const likeRouter = require('./routes/likeRoutes.js');
const commentRouter = require('./routes/commentRoutes.js')
const cookieParser = require('cookie-parser');

const AuthUtils=require('../server/Utilities/AuthenticationUtil');
const path = require('path');
const http = require('http');



/*
*  App configure
*/
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(cookieParser());

app.listen(port, () => {
    console.log("listening on port " + port);
    });
foodRouter(app);
likeRouter(app);
commentRouter(app);
/*
 *  Database configure
 */

 const dbConfig = require('./config/database.js');
 mongoose.Promise = global.Promise;
 mongoose.connect(dbConfig.url, {
    useMongoClient: true
}, (err) => {
    console.log('connected to database');
});
/**
 * Authentication
 */


app.use('/user',authentication);
app.use(ingredient);
// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// // Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});


const server = http.createServer(app);

