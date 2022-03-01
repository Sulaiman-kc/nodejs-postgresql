const express = require("express");
const router = express.Router();
const pool = require("../db");


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


router.post("/add_main_category", async(req, res) =>{
    try {
        const { name, image_url, order_column, is_active } = req.body;
        var start=new Date().toISOString();
        const createUser = await pool.query(
            "INSERT INTO main_category (name, image_url, order_column, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, image_url, order_column,is_active, start, start]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/edit_main_category", async(req, res) =>{
    try {
        const { name, image_url, order_column, is_active, id } = req.body;
        var start=new Date().toISOString();
        var query = `UPDATE main_category SET name = $1, image_url = $2, order_column = $3, is_active = $4, updated_at = $5 WHERE id = $6 RETURNING *`;
        const createUser = await pool.query(query,
            [name, image_url, order_column,is_active, start, id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/active_main_category", async(req, res) =>{
    try {
        const { is_active, id } = req.body;
        var start=new Date().toISOString();
        var query = `UPDATE main_category SET is_active = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
        const createUser = await pool.query(query,
            [is_active, start, id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/get_main_category", async(req, res) =>{
    try {
        var query = `SELECT * FROM main_category`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});




router.post("/add_sub_category", async(req, res) =>{
    try {
        const { name, image_url, order_column, is_active } = req.body;
        var start=new Date().toISOString();
        const createUser = await pool.query(
            "INSERT INTO sub_category (name, image_url, order_column, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, image_url, order_column,is_active, start, start]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/edit_sub_category", async(req, res) =>{
    try {
        const { name, image_url, order_column, is_active, id } = req.body;
        var start=new Date().toISOString();
        var query = `UPDATE sub_category SET name = $1, image_url = $2, order_column = $3, is_active = $4, updated_at = $5 WHERE id = $6 RETURNING *`;
        const createUser = await pool.query(query,
            [name, image_url, order_column,is_active, start, id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/active_sub_category", async(req, res) =>{
    try {
        const { is_active, id } = req.body;
        var start=new Date().toISOString();
        var query = `UPDATE sub_category SET is_active = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
        const createUser = await pool.query(query,
            [is_active, start, id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/get_sub_category", async(req, res) =>{
    try {
        var query = `SELECT * FROM sub_category`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});



router.post("/set_main_sub_category", async(req, res) =>{
    try {
        const { main_category_id, sub_category_id } = req.body;


        const category = await pool.query(
            "SELECT * FROM main_sub_categories WHERE main_category_id = $1 AND sub_category_id = $2",
            [main_category_id, sub_category_id]
        );

        if(category.rows.length == 0){
            var start=new Date().toISOString();
            const createUser = await pool.query(
                "INSERT INTO main_sub_categories (main_category_id, sub_category_id, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *",
                [main_category_id, sub_category_id, start, start]
            );
            res.json({"status": 1, "data": createUser.rows[0]});  
        }
        else{
            res.json({"status": 0, "msg": "ALREADYEXIST"});  
        }
        
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/get_main_sub_category", async(req, res) =>{
    try {
        const { id } = req.body;
        var query = `SELECT * FROM main_sub_categories WHERE main_category_id = $1`;
        console.log(query);
        const createUser = await pool.query(query, [id]);
        var data = createUser.rows;
        for(var i in data){
            var query = `SELECT * FROM sub_category WHERE id = $1`;
            const createUser1 = await pool.query(query, [data[i]['sub_category_id']]);
            if(createUser1.rows.length == 0 || createUser1.rows[0]['is_active'] == 0){
                data.splice(i, 1);
            }
            else{
                data[i]['details'] = createUser1.rows[0];
            }
        }
        res.json({"status": 1, "data": data});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});





module.exports = router;