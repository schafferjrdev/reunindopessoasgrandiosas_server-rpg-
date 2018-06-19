const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'mysql.hostinger.com.br',
        user: 'bdbixosm_ducksmd',
        password: 'P4T0SSMDmestre',
        port: 3306,
        database: 'bdbixosm_bixosmd'
    });
};


module.exports = con;

