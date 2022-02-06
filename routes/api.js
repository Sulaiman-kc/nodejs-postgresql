const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/create_user", async(req, res) =>{
    try {
        const { name } = req.body;
        const createUser = await pool.query(
            "INSERT INTO users (name) VALUES ($1) RETURNING *",
            [name]
        );
        res.json(createUser);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;