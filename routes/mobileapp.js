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

 




module.exports = router;