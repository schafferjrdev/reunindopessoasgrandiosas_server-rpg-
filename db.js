const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3308,
        database: 'bancobixossmd'
    });
};

module.exports = con;