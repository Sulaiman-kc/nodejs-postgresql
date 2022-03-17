const express = require("express");
const router = express.Router();
const pool = require("../db");
router.post("/drop_tables", async(req, res) =>{
    try {
        var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.post("/get_main_sub_category", async(req, res) =>{
    try {
        var query =`select * from main_sub_categories;`
        console.log(query);
        const createUser = await pool.query(query);
        console.log(createUser);
        res.json({"status": 1});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.post("/", async(req, res) =>{
	res.json({"type": "post"})
});
router.get("/", async(req, res) =>{
   res.json({"type": "get"})
});
// router.post("/insert", async(req, res) =>{
//     try {
//         const { name } = req.body;
//         const createUser = await pool.query(
//             "INSERT INTO services (name) VALUES ($1) RETURNING *",
//             [name]
//         );
//         res.json(createUser);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// router.post("/view", async(req, res) =>{
//     try {
//         // const { name } = req.body;
//         const createUser = await pool.query(
//             "SELECT * FROM services"
//         );
//         res.json(createUser);
//     } catch (err) {
//         console.error(err.message);
//     }
// });


// router.post("/viewdemo", async(req, res) =>{
//     try {
        
//         // // const { name } = req.body;
//         // const createUser = await pool.query(
//         //     "SELECT * services"
//         // );
//         res.json("createUser");
//     } catch (err) {
//         console.error(err.message);
//     }
// });





router.post("/user_login", async(req, res) =>{//login_check
    try {
        const { phone, otp } = req.body;
        console.log(otp);
        const createUser = await pool.query(
            "SELECT * FROM users WHERE phone_number = $1",
            [phone]
        );
        if(createUser.rows.length == 0){
            res.json({"status": 1, "isNewUser": 1});  
        }
        else{
            res.json({"status": 1, "isNewUser": 0, "data":createUser.rows[0]});  
        }
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/user_details", async(req, res) =>{
    try {
        const { id } = req.body;
        const createUser = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        res.json({"status": 1, "data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});




router.post("/create_user", async(req, res) =>{//new_user
    try {
        const { name, email, token, phone, address, lat, long, user_ip, otp, gender } = req.body;
        var start=new Date().toISOString();
        console.log(otp);
        const createUser = await pool.query(
            "INSERT INTO users (name, email, user_token, phone_number, address, latitude, longitude, user_ip, otp, gender, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});


router.post("/update_notification_token", async(req, res) =>{
    try {
        const { id, token } = req.body;
        var query = `UPDATE users SET user_token = $1 WHERE id = $2 RETURNING *`;
        console.log(query);
        const createUser = await pool.query(query,[token, id]);
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});


router.post("/edit_user", async(req, res) =>{
    try {
        const { name, email, phone, gender, avatar, id } = req.body;
        var query = `UPDATE users SET name = $1, email = $2, phone_number = $3, gender = $4, avatar = $5 WHERE id = $6 RETURNING *`;
        console.log(query);
        const createUser = await pool.query(query,[name, email, phone, gender, avatar, id]);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});


router.post("/update_location", async(req, res) =>{
    try {
        const { address, lat, long, id } = req.body;
        var query = `UPDATE users SET address = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *`;
        console.log(query);
        const createUser = await pool.query(query,[address, lat, long, id]);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});


router.post("/get_users", async(req, res) =>{
    try {
        var query = `SELECT * FROM users`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});

router.post("/get_main_category", async(req, res) =>{//get_main_category
    try {
        var query = `SELECT * FROM main_category where is_active='true'`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});

router.post("/get_business", async(req, res) =>{//get_business
    try {
        var query = `SELECT * FROM business where is_active='true'`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});


module.exports = router;
