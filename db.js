const mysql = require('mysql');

let con = () => {
    return mysql.createConnection({
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10242187',
        password: 'Ih3psvg77J',
        port: 3306,
        database: 'sql10242187'
    });
};


module.exports = con;

