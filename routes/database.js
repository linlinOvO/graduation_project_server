const {createPool} = require('mysql');

// 要连接的数据库
const pool = createPool({
    host: "127.0.0.1",
    port: 3306, // default port for mysql is 3306
    user: "root",
    password: "password",
    connectionLimit: 10,
    multipleStatements: true,
    timezone: "-0:00"
});

module.exports = pool
