const Pool = require("pg").Pool;

const pool = new Pool({
    user: "cqhiurnm",
    password: "gjAYkq6JBCYdk3GM9J81rJpABJUJioOT",
    database: "cqhiurnm",
    host: "rosie.db.elephantsql.com",
    port: 5432
});


module.exports = pool;