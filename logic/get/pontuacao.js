var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var dia = request.query.dia;
		
		var resposta={"familias":[],"pontosT":0};

		con.connect();

		con.query("SELECT DISTINCT atividade_familia_id FROM atividade WHERE atividade_familia_id > 0", function (err, result, fields) {

		 });


		con.query("SELECT SUM(atividade_pontuacao) AS pontosT FROM atividade", function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	
		    	

		    }else{
		    	
		    	resposta.pontosT=result[0].pontosT;
		    	
		    }

		  });

		 con.query("CREATE OR REPLACE VIEW resultadoDia AS SELECT familia.familia_id, SUM(atividade.atividade_pontuacao) AS pontuacaoTotal FROM familia JOIN atividade ON (familia.familia_id = atividade.atividade_familia_id) WHERE atividade.atividade_data = "+dia+" group by atividade.atividade_familia_id", function (err, result, fields) {

		 });

				
		
		con.query("SELECT familia.familia_id, familia.familia_nome, familia.familia_foto, SUM(atividade.atividade_pontuacao) AS pontuacao, resultadoDia.pontuacaoTotal AS pontosDia FROM familia LEFT JOIN atividade ON ( familia.familia_id = atividade.atividade_familia_id AND atividade.atividade_data <= "+dia+") LEFT JOIN resultadoDia ON (familia.familia_id = resultadoDia.familia_id) GROUP BY familia.familia_id" , function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	
		    	deferred.resolve(false);

		    }else{
		    	console.log(result);
		    	
		    	for(var x=0;x<result.length;x++){
		    		if(result[x].pontosDia == null || result[x].pontosDia == "" || result[x].pontosDia == undefined){
		    			result[x].pontosDia = 0;
		    		}
		    		if(result[x].pontuacao == null || result[x].pontuacao == "" || result[x].pontuacao == undefined){
		    			result[x].pontuacao = 0;
		    		}
		    	}
		    	
		    	resposta.familias = result;
		    	deferred.resolve(resposta);

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