const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'www.db4free.net',
        user: 'bixoprojeto2',
        password: 'bixoprojeto2',
        port: 3306,
        database: 'vireibixobd'
    });
};


module.exports = con;

