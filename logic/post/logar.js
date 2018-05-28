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

		var login = request.body.login;

		var senha = request.body.senha;

		console.log(login,senha);



		con.query("SELECT * FROM usuario WHERE user_login='"+login+"'", function (err, result, fields) {
			    if (err) throw deferred.reject(err);

			    if(result == null || result == "" || result == undefined){
					console.log("Não existe"); //Resposta para conta inexistente
					var e = {mensagem : "Esse usuário não existe", status: 404};
					deferred.reject(e);

				}else{

					con.query("SELECT * FROM usuario JOIN familia ON (usuario.user_familia_id = familia.familia_id) WHERE user_login='"+login+"' AND BINARY user_senha='"+senha+"'", function (err, result, fields) {
					    if (err) throw deferred.reject(err);

					    if(result == null || result == "" || result == undefined){
							console.log("Não existe"); //Resposta para conta inexistente
							var e = {mensagem : "Senha está incorreta", status: 401};
							deferred.reject(e);
						}else{
							//console.log(result); //Resposta para conta existente
							console.log("Entrou");
							
							
								 // if(result[0].user_notificacao == null){
					     			
					    //  		}else{

					    //  			result[0].user_notificacao = result[0].user_notificacao.toLocaleString();
					    //  		}	

					    	
							deferred.resolve(result);
							// return result;
						}
				
					    
		  	  
		  			});

				}
				
					    
		  	  
		  	});

		
	
			

	
	return	deferred.promise;
	// });	

	}

	function checkResult(result) {
        console.log("Meu Result "+result);
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