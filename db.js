const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: '187.18.169.169',
        user: 'bdbixosm_ducksmd',
        password: 'P4T0SSMDmestre',
        port: 3306,
        database: 'bdbixosm_bixosmd'
    });
};


module.exports = con;

