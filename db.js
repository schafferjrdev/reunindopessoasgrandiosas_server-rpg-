const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10241069',
        password: 'Xv2lBwXhDq',
        port: 3306,
        database: 'sql10241069'
    });
};


module.exports = con;