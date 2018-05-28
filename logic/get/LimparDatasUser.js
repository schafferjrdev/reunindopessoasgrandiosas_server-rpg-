var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var idUser = request.query.id;
		
				
		con.query("UPDATE usuario SET user_notificacao=null WHERE usuario.user_id ="+idUser, function (err, result, fields) {
							if (err) throw err;
							
							console.log("LIMPOU");
		});

		deferred.resolve(true);
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