const moment 		= require('moment');
var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();

		let conInterna = db();
		let conInternaComData = db();

		var data = request.query.data;
		var idUser = request.query.id;
		var dataOld;
		var notificacoes={"antigas":[],"novas":[]};

	
		con.connect();

		con.query("SELECT user_notificacao FROM usuario WHERE user_id="+idUser, function (err, result, fields) {
			

			if(result[0].user_notificacao == "0000-00-00 00:00:00" || result[0].user_notificacao == null || result[0].user_notificacao == undefined || result[0].user_notificacao == ""){
				
				console.log("Tudo zerado");
						
						conInterna.connect();
						conInterna.query("SELECT * FROM notificacao ORDER BY notificacao_data DESC", function (err, result, fields) {
						    if (err) throw err;

						    
						    if(result == null || result == "" || result == undefined){
						    	console.log("Não Tem notificacao nova");
						    	deferred.resolve(result);

						    }else{
						    	
						    	for(var x=0;x<result.length;x++){
						    		result[x].notificacao_data = moment(result[x].notificacao_data, "D_M_YYYY").locale('pt-br').format('LLLL');

						    	}
						    	notificacoes.novas = result;
						    	deferred.resolve(notificacoes);
						    	console.log("Todas as notificacoes");
						    }

						});

						conInterna.query("UPDATE usuario SET user_notificacao="+data+" WHERE usuario.user_id ="+idUser, function (err, result, fields) {
							if (err) throw err;
							
							console.log("Requisicao salva");
						});

						conInterna.end();
			
			}else{
				console.log("Tem uma data lá");

				conInternaComData.connect();

				conInternaComData.query("SELECT * FROM notificacao WHERE notificacao_data >='"+result[0].user_notificacao.toISOString()+"' ORDER BY notificacao_data DESC", function (err, result, fields) {
						    if (err) throw err;

						    
						   
						    	
						    	for(var x=0;x<result.length;x++){

						    		result[x].notificacao_data =moment(result[x].notificacao_data, "D_M_YYYY").locale('pt-br').format('LLLL');
						    		


						    	}
						    	notificacoes.novas = result;

						    	
						    	console.log("Só as novas");
						    

						});

					conInternaComData.query("SELECT * FROM notificacao WHERE notificacao_data <'"+result[0].user_notificacao.toISOString()+"' ORDER BY notificacao_data DESC", function (err, result, fields) {
						    if (err) throw err;

						    
						    						    	
						    	for(var x=0;x<result.length;x++){

						    		result[x].notificacao_data =moment(result[x].notificacao_data, "D_M_YYYY").locale('pt-br').format('LLLL');
						    		


						    	}
						    	notificacoes.antigas = result;

						    	deferred.resolve(notificacoes);
						    	console.log("Só as novas");
						    

						});

						conInternaComData.query("UPDATE usuario SET user_notificacao="+data+" WHERE usuario.user_id ="+idUser, function (err, result, fields) {
							if (err) throw err;
							
							console.log("Requisicao salva");
						});

						conInternaComData.end();
						
			
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

