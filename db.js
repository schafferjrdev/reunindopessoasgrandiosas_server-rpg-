const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'mysql.hostinger.com.br',
        user: 'bdbixosmd',
        password: 'GianSchaffer1993',
        port: 3306,
        database: 'bdbixosm_bixosmd'
    });
};


module.exports = con;

