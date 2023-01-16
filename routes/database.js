const {createPool} = require('mysql');

// 要连接的数据库
const pool = createPool({
    host: "localhost",
    port: 3306, // default port for mysql is 3306
    user: "root",
    password: "password",
    connectionLimit: 10,
    multipleStatements: true
});

module.exports = pool
