const Pool = require("pg").Pool;
// "Db_host": "127.0.0.1",
//         "Db_port": 5432,
//         "Db_user": "postgres",
//         "Db_password": "isfrc",
//         "Db_dbname": "cccontrol",
//         "pool": {
//             "max": 50,
//             "min": 0,
//             "acquire": 3000,
//             "idle": 10000
//           }
const pool = new Pool({
    user: "postgres",//"cqhiurnm",
    password: "isfrc",//"gjAYkq6JBCYdk3GM9J81rJpABJUJioOT",
    database: "mobileapp",//"cqhiurnm",
    host:  "127.0.0.1",//"rosie.db.elephantsql.com",
    port: 5432
});


module.exports = pool;