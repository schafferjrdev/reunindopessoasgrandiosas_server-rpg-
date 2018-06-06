var appRootPath = require('app-root-path');
const bodyParser 	= require('body-parser');
var q = require('q');
let db = require('../../db');


             
module.exports = function(request, response) {
	//Cadastro
	
	



	function doSomething(){
	var deferred = q.defer();

	let con = db();
	let conBixo = db();
	let conBixoInsert = db();
	let conVet = db();
	let conVetInsert = db();
		
	var login = request.body.login;
	var senha = request.body.senha;
	var nome = request.body.nome;
	var tipo = request.body.tipo;
	var foto = request.body.foto;
	var desc = request.body.desc;
	var area = request.body.area;
	var semestre = request.body.semestre;

	var familiaId =1;



		con.connect();
		con.query("SELECT * FROM usuario WHERE user_login=replace('"+login+"', ' ', '')", function (err, result, fields) {
			    if (err) throw err;

			if(result == null || result == "" || result == undefined){
				console.log("Não existe esse login, pode cadastrar"); //Resposta para conta inexistente
			
					    
		  	  
		  	

				if(tipo == 0){
					//Se for Bixo
					conBixo.connect();
					conBixo.query("SELECT user_familia_id FROM usuario WHERE user_tipo=0 ORDER BY user_hora_cadastro DESC limit 1", function (err, result, fields) {
					    if (err) throw err;


					    if(result[0] == undefined || result[0] == null || result[0] == ""){

					    	familiaId = 1;
					    	
					    }else{
						    familiaId = result[0].user_familia_id;

						    familiaId++;

						    if(familiaId>4){
						    	familiaId =1;
						    }

						}

					    	var sql = "INSERT INTO usuario(user_login, user_senha, user_nome, user_descricao, user_foto, user_familia_id, user_tipo, user_hora_cadastro) VALUES (replace('"+login+"', ' ', ''), replace('"+senha+"', ' ', ''), '"+nome+"','"+desc+"','"+foto+"',"+familiaId+",0,CURRENT_TIMESTAMP)";
					    	

					    	conBixoInsert.connect();
					    	conBixoInsert.query(sql, function (err, result, fields) {
					    		console.log("ERRO: "+err);

					    	});
					    	conBixoInsert.end();
					    
				  	  
				  	});
					conBixo.end();



					deferred.resolve(true);
					console.log("Bixo Cadastrado");
				}else{
					//Se for Veterano
					conVet.connect();
					conVet.query("SELECT user_familia_id FROM usuario WHERE user_tipo=1 ORDER BY user_hora_cadastro DESC limit 1", function (err, result, fields) {
					    if (err) throw err;

					    if(result[0] == undefined || result[0] == null || result[0] == ""){

					    	familiaId = 1;

					    }else{
						    familiaId = result[0].user_familia_id;

						    familiaId++;

						    if(familiaId>4){
						    	familiaId =1;
						    }

						}

					    	var sql = "INSERT INTO usuario(user_login, user_senha, user_nome, user_descricao, user_area, user_semestre, user_foto, user_familia_id, user_tipo, user_hora_cadastro) VALUES (replace('"+login+"', ' ', ''), replace('"+senha+"', ' ', ''),'"+nome+"','"+desc+"','"+area+"','"+semestre+"','"+foto+"',"+familiaId+",1,CURRENT_TIMESTAMP)";
					    	

					    	conVetInsert.connect();
					    	conVetInsert.query(sql, function (err, result, fields) {
					    		console.log("ERRO: "+err);

					    	});
					    	conVetInsert.end();
					    
				  	  
				  	});
				  	conVet.end();

					deferred.resolve(true);
					console.log("Veterano Cadastrado");
				}


			}else{
				console.log("Esse Login já existe, não cadastrou"); //Resposta para conta existente
				deferred.resolve(false);
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