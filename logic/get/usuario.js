var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var idUser = request.query.id;
		
				
		con.query("SELECT * FROM usuario JOIN familia ON (usuario.user_familia_id = familia.familia_id) WHERE user_id="+idUser, function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem");
		    	deferred.resolve(result);

		    }else{
		    	console.log("Tem");
		    	deferred.resolve(result);
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