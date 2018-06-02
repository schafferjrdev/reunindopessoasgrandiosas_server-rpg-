const appRootPath 	= require('app-root-path'); 
const app 			= appRootPath.require('./app');  
const mysql 		= require('mysql');
 
const port = process.env.PORT || 8080;   

app.listen(port, function () {   
	console.log('Server listening on: http://localhost:%s', port)
	 })