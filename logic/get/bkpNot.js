var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {

	

	function doSomething(){
		var deferred = q.defer();
		let con = db();
		var data = request.query.data;
	
		

		if(data == 0){
		con.query("SELECT * FROM notificacao ORDER BY notificacao_data", function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem notificacao");
		    	deferred.resolve(result);

		    }else{
		    	console.log("Tem notificacao");
		    	for(var x=0;x<result.length;x++){
		    		result[x].notificacao_data = result[x].notificacao_data.toLocaleString();

		    	}
		    	deferred.resolve(result);
		    }

		  });
	}else{
		

		con.query("SELECT * FROM notificacao WHERE notificacao_data >="+data+" ORDER BY notificacao_data", function (err, result, fields) {
		    if (err) throw err;

		    
		    if(result == null || result == "" || result == undefined){
		    	console.log("Não Tem notificacao nova");
		    	deferred.resolve(result);

		    }else{
		    	console.log("Tem notificacao nova");
		    	for(var x=0;x<result.length;x++){
		    		result[x].notificacao_data = result[x].notificacao_data.toLocaleString();

		    	}
		    	deferred.resolve(result);
		    }

		  });
		

	}
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