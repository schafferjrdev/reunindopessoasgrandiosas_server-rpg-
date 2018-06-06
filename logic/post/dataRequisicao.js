var appRootPath = require('app-root-path');
const bodyParser 	= require('body-parser');
var q = require('q');
let db = require('../../db');


             
module.exports = function(request, response) {
	//Não está sendo usado
	



	function doSomething(){
	var deferred = q.defer();

	let con = db();
		
	var id = request.body.id;	
	var requisicao = request.body.ultimaRequisicao;
	

    	
	con.query("UPDATE usuario SET user_notificacao='"+requisicao+"' WHERE usuario.user_id ="+id, function (err, result, fields) {
		if (err) throw err;
		
		deferred.resolve(true);
	});

	  

			
		
	
		return	deferred.promise;
	con.end();
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