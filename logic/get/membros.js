var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let conTudo = db();
		let conId= db();

		var idUser = request.query.idUser;
		var idFamilia = request.query.idFamilia;

		

		console.log(idUser,idFamilia);

		if(idUser == null){

			conTudo.connect();
			conTudo.query("SELECT * FROM usuario WHERE user_familia_id="+idFamilia, function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem");
		    	deferred.resolve(result);

		    }else{
		    	console.log("Tem");
		    	deferred.resolve(result);
		    }

		  });
			conTudo.end();

		}else{
		
		conId.connect();
		conId.query("SELECT * FROM usuario WHERE user_familia_id="+idFamilia+" AND NOT user_id="+idUser, function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem");
		    	deferred.resolve(result);

		    }else{
		    	console.log("Tem");
		    	deferred.resolve(result);
		    }

		  });
		conId.end();
		
		}

		
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