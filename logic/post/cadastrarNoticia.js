var appRootPath = require('app-root-path');
const bodyParser 	= require('body-parser');
var q = require('q');
let db = require('../../db');

             
module.exports = function(request, response) {

	//Login

	

	

	function doSomething(){
	var deferred = q.defer();

	// return q.fcall(function () {     
		
		let con = db();

		var msg = request.body.msg;

		con.connect();
		con.query("INSERT INTO notificacao(notificacao_descricao, notificacao_data) VALUES ('"+msg+"',CURRENT_TIMESTAMP)", function (err, result, fields) {
			    if (err) throw deferred.reject(err);

			 			
					    
		  	  
		  	});
		con.end();

		
	console.log("'"+msg+"' Foi cadastrada com sucesso!");
			
	deferred.resolve("'"+msg+"' Foi cadastrada com sucesso!");
	
	return	deferred.promise;
	// });	

	}

	function checkResult(result) {
        
        response.status(200).send(result);
      	

    }

    function onError(error) {
    	// error = error[0];
    	console.log("Meu Erro :"+error.mensagem);
        response.status(error.status).send(error.mensagem);
    }

	doSomething()
	.then(checkResult)
	.catch(onError);
}