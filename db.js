const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "sulaimankc@2022",
    database: "demo_dalelna",
    host: "localhost",
    port: 5432
});


module.exports = pool;