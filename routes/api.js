const express = require("express");
const router = express.Router();
const pool = require("../db");
router.get("/drop_tables", async(req, res) =>{
    try {
        var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1});  
    }
    catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
// sub_categories_business
router.get("/insertsub_categories_business", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='3'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO sub_categories_business (sub_category_id, business_id, created_at, updated_at ) VALUES ( $1, $2, $3, $4) RETURNING *`,
            ['2', '1',start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.get("/insertrating", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='3'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO rating (users_id, business_id, rating, comments, created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6) RETURNING *`,
            ['1', ''+number, '2' , '{"data":["comment2"]}',start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.get("/insertlocation", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='1'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO location (name, arabic_name, latitude, longitude, is_active, created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            ['lname'+number, 'larabic_name'+number, 3.555555 , 6.33333, true,start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.get("/insertlocationbusiness", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='4'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO location_business ( business_id, location_id, created_at, updated_at ) VALUES ( $1, $2, $3, $4) RETURNING *`,
            [ '4', '1', start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.get("/insertbusiess", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='4'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO business (name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name, keywords, keys, created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *`,
            ['name'+number, 'arabic_name'+number, true, 'sub_name'+number, 'arabic_sub_name'+number,'description'+number,'arabic_description'+number, 'address'+number, '27.2050° N', '77.4950° E', 'phone_number'+number ,'alt_phone_number'+number, 'email'+number, 'slug'+number, 'rating'+number,   'web'+number, 'socialmedia'+number, 'timing'+number, '{"data":["service_name"]}' , '{"data":["arabic_service_name"]}',  '{"data":["keywords"]}',  '{"data":["keys"]}',start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
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




router.get("/create_user", async(req, res) =>{//new_user
    try {
        const { name, email, token, phone, address, lat, long, user_ip, otp, gender } = { 'name':'name1','email':'email1','token':'token1','phone':'232341321','address':'dsffdfdfs1','lat':2.333333,'long':4.333333,'user_ip':'weqewqw1','otp':32323,'gender':'male' }
        req.body;
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

router.get("/get_business_locationsorting", async(req, res) =>{//get_business_locationsorting
    try {
        // var query = `SELECT * FROM business where is_active='true'`;
        const latitude  = 3.414478;
        const longitude =7.466646;
//         $sf = 3.14159 / 180; // scaling factor
// $sql = "SELECT * FROM table 
//     WHERE lon BETWEEN '$minLon' AND '$maxLon' 
//       AND lat BETWEEN '$minLat' AND '$maxLat'
//     ORDER BY ACOS(SIN(lat*$sf)*SIN($lat*$sf) + COS(lat*$sf)*COS($lat*$sf)*COS((lon-$lon)*$sf))";
// SELECT id, ( 6371 * acos ( cos ( radians($user_lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($user_lng) ) + sin ( radians($user_lat) ) * sin( radians( lat ) ))) AS distanceFROM tableHAVING distance < 30ORDER BY distanceLIMIT 0 , 20;
        // var query =`select * from business where business_id in
        // (select business_id from location_business as lb join location as l on lb.location_id=l.location_id where latitude='`+latitude+`' and longitude ='`+longitude+`');`
        // var query = select * from ( SELECT  *,( 3959 * acos( cos( radians(6.414478) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(12.466646) ) + sin( radians(6.414478) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5 ORDER BY distance LIMIT 20;
        // var query =`select * from business where business_id in
        // (select business_id from location_business as lb where lb.location_id in (select location_id from ( SELECT  *,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5000 ORDER BY distance LIMIT 20;        ));`
        // var query =`select * from business where business_id in (select business_id from location_business as lb where lb.location_id in (select location_id from ( SELECT  * , ( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 500 ORDER BY distance LIMIT 20))`
        
        var query = `select * from business as b ,(select * from location_business as lb ,(select * from ( SELECT  *,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 700 ORDER BY distance desc LIMIT 20) as s where lb.location_id=s.location_id) as sb where b.business_id=sb.business_id order by distance ;
        `
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.get("/get_business_alphabetsorting", async(req, res) =>{//get_business_alphabetsorting
    try {
        // var query = `SELECT * FROM business where is_active='true'`;
        const latitude  = 2.555555;
        const longitude = 5.333333
        var query =`select * from business order by name`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } 
    catch (err) 
    {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.get("/get_business_ratingsorting", async(req, res) =>{//get_business_alphabetsorting
    try {
        // var query = `SELECT * FROM business where is_active='true'`;
      
        var query =`select * from business as b ,(select * from rating order by rating) as r where b.business_id=r.business_id order by r.rating`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } 
    catch (err) 
    {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.get("/get_business_ratingfiltering", async(req, res) =>{//get_business_alphabetsorting\\\\\\\\\\\\\\\\\\\\\\\
    try {
        // var query = `SELECT * FROM business where is_active='true'`;
      const rating = 4
        var query =`select * from business as b ,(select * from rating) as r where b.business_id=r.business_id and r.rating='`+rating+`';`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } 
    catch (err) 
    {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.get("/get_business_locationfiltering", async(req, res) =>{//get_business_locationsorting
    try {
        // var query = `SELECT * FROM business where is_active='true'`;
        const latitude  = 3.414478;
        const longitude =7.466646;
        const searchlatitude  = 3.414478;
        const searchlongitude =7.466646;
//         $sf = 3.14159 / 180; // scaling factor
// $sql = "SELECT * FROM table 
//     WHERE lon BETWEEN '$minLon' AND '$maxLon' 
//       AND lat BETWEEN '$minLat' AND '$maxLat'
//     ORDER BY ACOS(SIN(lat*$sf)*SIN($lat*$sf) + COS(lat*$sf)*COS($lat*$sf)*COS((lon-$lon)*$sf))";
// SELECT id, ( 6371 * acos ( cos ( radians($user_lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($user_lng) ) + sin ( radians($user_lat) ) * sin( radians( lat ) ))) AS distanceFROM tableHAVING distance < 30ORDER BY distanceLIMIT 0 , 20;
        // var query =`select * from business where business_id in
        // (select business_id from location_business as lb join location as l on lb.location_id=l.location_id where latitude='`+latitude+`' and longitude ='`+longitude+`');`
        // var query = select * from ( SELECT  *,( 3959 * acos( cos( radians(6.414478) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(12.466646) ) + sin( radians(6.414478) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5 ORDER BY distance LIMIT 20;
        // var query =`select * from business where business_id in
        // (select business_id from location_business as lb where lb.location_id in (select location_id from ( SELECT  *,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5000 ORDER BY distance LIMIT 20;        ));`
        // var query =`select * from business where business_id in (select business_id from location_business as lb where lb.location_id in (select location_id from ( SELECT  * , ( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 500 ORDER BY distance LIMIT 20))`
        
        var query = `select * from business as b ,(select * from location_business as lb ,(select * from ( SELECT  *,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al ) as s where lb.location_id=s.location_id) as sb where b.business_id=sb.business_id and  latitude =`+searchlatitude+` and longitude =`+searchlongitude+` ;
        `
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.get("/get_categoryfiltering", async(req, res) =>{//get_business_locationsorting
    try {
        // var query = `SELECT * FROM business where is_active='true'`;
        const subcategory  = 'subs1';
        
//         $sf = 3.14159 / 180; // scaling factor
// $sql = "SELECT * FROM table 
//     WHERE lon BETWEEN '$minLon' AND '$maxLon' 
//       AND lat BETWEEN '$minLat' AND '$maxLat'
//     ORDER BY ACOS(SIN(lat*$sf)*SIN($lat*$sf) + COS(lat*$sf)*COS($lat*$sf)*COS((lon-$lon)*$sf))";
// SELECT id, ( 6371 * acos ( cos ( radians($user_lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($user_lng) ) + sin ( radians($user_lat) ) * sin( radians( lat ) ))) AS distanceFROM tableHAVING distance < 30ORDER BY distanceLIMIT 0 , 20;
        // var query =`select * from business where business_id in
        // (select business_id from location_business as lb join location as l on lb.location_id=l.location_id where latitude='`+latitude+`' and longitude ='`+longitude+`');`
        // var query = select * from ( SELECT  *,( 3959 * acos( cos( radians(6.414478) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(12.466646) ) + sin( radians(6.414478) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5 ORDER BY distance LIMIT 20;
        // var query =`select * from business where business_id in
        // (select business_id from location_business as lb where lb.location_id in (select location_id from ( SELECT  *,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5000 ORDER BY distance LIMIT 20;        ));`
        // var query =`select * from business where business_id in (select business_id from location_business as lb where lb.location_id in (select location_id from ( SELECT  * , ( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 500 ORDER BY distance LIMIT 20))`
        var query = `select * from business where business_id in (select business_id from (select * from sub_categories_business as subb , (select * from sub_category where name='`+subcategory+`' and isactive=true) as sub where subb.sub_category_id=sub.sub_category_id) as subbsub) ;`
        // var query = `select * from business as b ,(select * from location_business as lb ,(select * from ( SELECT  *,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al ) as s where lb.location_id=s.location_id) as sb where b.business_id=sb.business_id and  latitude =`+searchlatitude+` and longitude =`+searchlongitude+` ;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
// select * from ( SELECT  *,( 3959 * acos( cos( radians(6.414478) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(12.466646) ) + sin( radians(6.414478) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5 ORDER BY distance LIMIT 20;
// SELECT id, ( 6371 * acos ( cos ( radians(27.2046° N) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($user_lng) ) + sin ( radians(27.2046° N) ) * sin( radians( lat ) ))) AS distanceFROM tableHAVING distance < 30ORDER BY distanceLIMIT 0 , 20;
//l | long// 27.2046° N | 77.4977° E
// select * from business as b join location_business as lb on b.business_id=lb.business_id; 
// select location_id from location where latitude='27.2046° N';
// select business_id from location_business as lb join location as l on lb.location_id=l.location_id where latitude='27.2046° N';


// select * from business where business_id in (select business_id from (select * from sub_categories_business as subb , (select * from sub_category where name='subs1') as sub where subb.sub_category_id=sub.sub_category_id) as subbsub) ;

module.exports = router;