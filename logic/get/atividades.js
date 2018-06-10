var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var dia = request.query.dia;
		
		con.connect();		
		con.query("SELECT atividade.atividade_id, atividade.atividade_nome, atividade.atividade_pontuacao, atividade.atividade_familia_id AS vencedor, familia.familia_vencedor AS vencedor_foto FROM atividade LEFT JOIN familia ON(atividade.atividade_familia_id = familia.familia_id) WHERE atividade_data ="+dia, function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem");
		    	deferred.resolve(result);

		    }else{
		    	console.log("Tem "+result.length+" atividades");
		    	deferred.resolve(result);
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
