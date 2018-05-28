const express 		= require('express');
const bodyParser 	= require('body-parser');
const appRootPath 	= require('app-root-path');
const mysql 		= require('mysql');

const app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));





var post 	= appRootPath.require('./routes/post');
var get 	= appRootPath.require('./routes/get');

app.use('/post', post);
app.use('/get', get);




app.use(function(request, response) {
	response.status(400).send("Servidor Online...");
});


module.exports = app;