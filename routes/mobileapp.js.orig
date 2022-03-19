const express = require("express");
const router = express.Router();
const pool = require("../db");
const config = require('../config.json');
var cors = require('cors')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));
// middleware that is specific to this router
router.use(cors());
router.use(function timelog(req, resp, next) {
  next();
})

router.post("/get_users", async(req, res) =>{
    try {
        var query = `SELECT * FROM users`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});




module.exports = router;
