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
		let con2 = db();
		let con3 = db();

		var login = request.body.login;

		var senha = request.body.senha;

		


		con.connect();

		con.query("SELECT * FROM usuario WHERE user_login='"+login+"'", function (err, result, fields) {
			    if (err) throw deferred.reject(err);

			    if(result == null || result == "" || result == undefined){
					console.log("Não existe"); //Resposta para conta inexistente
					var e = {mensagem : "Esse usuário não existe", status: 404};
					deferred.reject(e);

				}else{

					
					con2.connect();
					con2.query("SELECT * FROM usuario JOIN familia ON (usuario.user_familia_id = familia.familia_id) WHERE user_login='"+login+"' AND BINARY user_senha='"+senha+"'", function (err, result, fields) {
					    if (err) throw deferred.reject(err);

					    if(result == null || result == "" || result == undefined){
							console.log("Não existe"); //Resposta para conta inexistente
							var e = {mensagem : "Senha está incorreta", status: 401};
							deferred.reject(e);
						}else{
							//console.log(result); //Resposta para conta existente
							console.log(result[0].user_nome+" Entrou");
							con3.connect();
							con3.query("UPDATE usuario SET user_inicial = '0' WHERE usuario.user_id='"+login+"'", function (err, result, fields) {

							});
							con3.end();
								 // if(result[0].user_notificacao == null){
					     			
					    //  		}else{

					    //  			result[0].user_notificacao = result[0].user_notificacao.toLocaleString();
					    //  		}	

					    	
							deferred.resolve(result);
							// return result;
						}
				
					    
		  	  
		  			});
		  			
					con2.end();
				}
				
					    
		  	  
		  	});

		con.end();

		
	
			

	
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
