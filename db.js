const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'iuri0012.hospedagemdesites.ws:2083/',
        user: 'bdbixosmd',
        password: 'GianSchaffer1993',
        port: 3306,
        database: 'bdbixosm_bixosmd'
    });
};


module.exports = con;

