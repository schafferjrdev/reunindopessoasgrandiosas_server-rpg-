var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var login = request.query.login;

		con.connect();
		
		con.query("SELECT * FROM usuario WHERE user_login="+login, function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log(login+" não existe");
		    	deferred.resolve(false);

		    }else{
		    	console.log(login+" existe");
		    	deferred.resolve(true);
		    }

		  });

		con.end();	

		
		return	deferred.promise;
		

	
	}



	function checkResult(result) {
        response.status(200).send(result);
    }

    function onError(error) {

        response.status(error.status).send(error);
    }

	doSomething()
	.then(checkResult)
	.catch(onError);
}