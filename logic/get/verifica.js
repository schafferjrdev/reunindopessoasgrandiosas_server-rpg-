var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var login = request.query.login;
		
		con.query("SELECT * FROM usuario WHERE user_login="+login, function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem");
		    	deferred.resolve(false);

		    }else{
		    	console.log("Tem");
		    	deferred.resolve(true);
		    }

		  });

		
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