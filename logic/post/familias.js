var appRootPath = require('app-root-path');
var q = require('q');
let db = require('../../db');

module.exports = function(request, response) {
//Não está sendo usado
	var idRec = request.query.id;

	function doSomething(){
		let con = db();
		

		if(idRec == null){
			con.query("SELECT * FROM familia", function (err, result, fields) {
		    if (err) throw err;
		    console.log(result);
		    return result;
		    
		  });
		con.end();	
		}else{
			con.query("SELECT * FROM familia WHERE familia_id = "+idRec, function (err, result, fields) {
		    if (err) throw err;
		    console.log(result);
		    return result;
		    
		  });
		con.end();	
		}
		
		
		return q.when("Retornou as famílias");

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