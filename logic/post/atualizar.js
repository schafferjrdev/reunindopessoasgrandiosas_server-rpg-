var appRootPath = require('app-root-path');
const bodyParser 	= require('body-parser');
var q = require('q');
let db = require('../../db');


             
module.exports = function(request, response) {
	//Cadastro
	
	



	function doSomething(){
	var deferred = q.defer();

	let con = db();

	let conBixoUpdate = db();
	
	let conVetUpdate = db();
		
	var id = request.body.user_id;	
	var nome = request.body.user_nome;
	var tipo = request.body.user_tipo;
	var foto = request.body.user_foto;
	var desc = request.body.user_descricao;
	var area = request.body.user_area;
	var semestre = request.body.user_semestre;




				if(tipo == 0){
					
					//Se for Bixo
					//mandar nome, desc, foto, tipo e id
					conBixoUpdate.connect();
					conBixoUpdate.query("UPDATE usuario SET user_nome='"+nome+"', user_descricao='"+desc+"', user_foto='"+foto+"' WHERE user_id ="+id, function (err, result, fields) {
					    if (err) throw err;
					    console.log("Bixo Atualizado");

				  	});
				  	
				  	conBixoUpdate.query("SELECT * FROM usuario JOIN familia ON (usuario.user_familia_id = familia.familia_id) WHERE user_id ="+id, function (err, result, fields) {
				    if (err) throw deferred.reject(err);

				    
						deferred.resolve(result);
				
			  		});
					conBixoUpdate.end();
					

				}else{
					//Se for Veterano
					
					//mandar nome, desc, foto, semestre, area, tipo e id
					conVetUpdate.connect();
					conVetUpdate.query("UPDATE usuario SET user_nome='"+nome+"', user_semestre='"+semestre+"', user_area='"+area+"', user_descricao='"+desc+"', user_foto='"+foto+"' WHERE user_id ="+id, function (err, result, fields) {
					    if (err) throw err;
					    console.log("Veterano Atualizado");

				  	});

				  	conVetUpdate.query("SELECT * FROM usuario JOIN familia ON (usuario.user_familia_id = familia.familia_id) WHERE user_id ="+id, function (err, result, fields) {
				    if (err) throw deferred.reject(err);

				    
						deferred.resolve(result);
				
			  		});
					conVetUpdate.end();
				  	
				}


				
				
				//con.end();
			
		
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