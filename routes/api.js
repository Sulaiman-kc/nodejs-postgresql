const express = require("express");
const router = express.Router();
const pool = require("../db");
var request = require('request');
// var cors = require('cors')
// router.use(cors());
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
// alert
router.get("/insertalert", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,alert,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='3'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO alert (data,users_id,is_read,type,image_url,url, created_at, updated_at ) VALUES ( $1, $2, $3, $4,$5,$6,$7,$8) RETURNING *`,
            ['data','2',1,1,'imageurl','url',start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.get("/insertfavorites", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='3'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO favorites (users_id,business_id,type, created_at, updated_at ) VALUES ( $1, $2, $3, $4,$5) RETURNING *`,
            ['2','1', 0,start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});

router.get("/insertkeyword", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='3'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO keyword (business_id,name,key, created_at, updated_at ) VALUES ( $1, $2, $3, $4,$5) RETURNING *`,
            ['2','name1','key1',start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
// keyword

router.get("/insertbusiness_image", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        var number='3'
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO business_image (business_id,type,image_url, created_at, updated_at ) VALUES ( $1, $2, $3, $4,$5) RETURNING *`,
            ['1', 2,'demo2.png',start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
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
        console.log(req.body);
        const { phone } = req.body;
        // console.log(otp);
        const createUser = await pool.query(
            "SELECT * FROM users WHERE phone_number = $1 and is_active='true'",
            [phone]
        );
        if(createUser.rows.length == 0){
            res.json({"status": 1, "isNewUser": 1, "data":[]});  
        }
        else{
            res.json({"status": 1, "isNewUser": 0, "data":createUser.rows[0]});  
        }
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/get_user_details", async(req, res) =>{
    try {
        const { id } = req.body;
        const createUser = await pool.query(
            "SELECT * FROM users WHERE id = $1 and is_active='true'",
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
        const { name, email, token, phone, address, lat, long, user_ip, otp, gender, image_url } = req.body//{ 'name':'name1','email':'email1','token':'token1','phone':'232341321','address':'dsffdfdfs1','lat':2.333333,'long':4.333333,'user_ip':'weqewqw1','otp':32323,'gender':'male' }
        req.body;
        var start=new Date().toISOString();
        console.log(otp);
        const createUser = await pool.query(
            "INSERT INTO users (name, email, user_token, phone_number, address, latitude, longitude, user_ip, otp, gender, image_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
            [name, email, token, phone, address, lat, long, user_ip, otp, gender, image_url, start, start]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0, "data": [], "msg": err.message});  
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
        const { name, email, phone, image_url, id } = req.body;
        var query = "UPDATE users SET name = $1, email = $2, phone_number = $3, image_url = $4 WHERE users_id = $5 RETURNING *";
        console.log(query);
        const createUser = await pool.query(query,[name, email, phone, image_url, id]);
        res.json({"status": 1, "data": createUser.rows[0]});  
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
        var query = `SELECT * FROM users where is_active='true'`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});


router.post("/business_enquiry", async(req, res) =>{
    try {
        const { name, business_name, email, phone, sub_category } = req.body;
        var start=new Date().toISOString();
        var query = `INSERT INTO business_enquiries (name, business_name, email, phone_number, sub_category, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        console.log(query);
        const createUser = await pool.query(query, [name, business_name, email, phone, sub_category, start, start]);
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

router.post("/get_business_locationsorting", async(req, res) =>{//get_business_locationsorting
    try {
        const { latitude , longitude } = req.body
       
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
router.post("/get_business_alphabetsorting", async(req, res) =>{//get_business_alphabetsorting
    try {
        
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
router.post("/get_business_ratingsorting", async(req, res) =>{//get_business_alphabetsorting
    try {
      
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
router.post("/get_business_ratingfiltering", async(req, res) =>{//get_business_alphabetsorting\\\\\\\\\\\\\\\\\\\\\\\
    try {
      const { rating } = req.body
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
router.post("/get_business_locationfiltering", async(req, res) =>{//get_business_locationsorting //doubt
    try {
        // const latitude  = 3.414478;
        // const longitude =7.466646;
        // const searchlatitude  = 3.414478;
        // const searchlongitude =7.466646;
        const {  searchlatitude ,searchlongitude } =req.body
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
router.post("/get_categoryfiltering", async(req, res) =>{//get_business_locationsorting
    try {
        const {subcategory}  = req.body//'subs1';
        var query = `select * from business where business_id in (select business_id from (select * from sub_categories_business as subb , (select * from sub_category where name='`+subcategory+`' and isactive=true) as sub where subb.sub_category_id=sub.sub_category_id) as subbsub) ;`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.post("/get_businessdetails", async(req, res) =>{//get_business_locationsorting
    try {
        const {business_id}  = req.body //'2';
        var query = `select bid,uname,latitude,longitude,rating,image_url from business_image bi,(select business_id bidfromr, bid,uname,latitude,longitude,rating from rating r ,(select bid,uname,latitude,longitude from location l,(select location_id lid,bid,uname  from location_business lb ,(select business_id bid ,name uname from business where business_id='`+business_id+`') b where lb.business_id=b.bid) bl where l.location_id=bl.lid) blfull where r.business_id=blfull.bid) blr where bi.business_id=blr.bid;`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});

router.post("/get_favorites", async(req, res) =>{//get_business_locationsorting
    try {
        const {user_id}  = req.body//'1';
        var query = `select * from business b ,(select business_id,type from favorites where users_id='`+user_id+`') fwithid where b.business_id=fwithid.business_id;`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.post("/edit_favorites", async(req, res) =>{//delete favorites            //////////remines///
    try {
        const {user_id}  = req.body//'1';
        var query = `select * from business b ,(select business_id,type from favorites where users_id='`+user_id+`') fwithid where b.business_id=fwithid.business_id;`
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.post("/store_rating", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        const { users_id , business_id , rating, title ,object } = req.body//{ "users_id":"1" , "business_id":'2' , "rating":'3', "title":"title" ,"object":"object" }   //req.body
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO rating (users_id, business_id, rating, comments, created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6) RETURNING *`,
            [users_id, business_id, rating , `{"title":"`+title+`","object":"`+object+`"}`,start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        res.json({"status": 1,"data":createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
    });
    router.post("/store_business", async(req, res) =>{//store business //not checked
        try {
          
            const { name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name } = req.body//{ name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name }//req.body
            var start=new Date().toISOString();

    
            const createUser = await pool.query(
                `INSERT INTO business (name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name, created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *`,
                [name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name,start,start]
                // ['name'+number, 'arabic_name'+number, true, 'sub_name'+number, 'arabic_sub_name'+number,'description'+number,'arabic_description'+number, 'address'+number, '27.2050° N', '77.4950° E', 'phone_number'+number ,'alt_phone_number'+number, 'email'+number, 'slug'+number, 'rating'+number,   'web'+number, 'socialmedia'+number, 'timing'+number, '{"data":["service_name"]}' , '{"data":["arabic_service_name"]}',  '{"data":["keywords"]}',  '{"data":["keys"]}',start,start]
                // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
            );
            res.json({"status": 1});  
        } catch (err) {
            res.json({"status": 0});  
            console.error(err.message);
        }
    });
    router.post("/get_sub_categories", async(req, res) =>{//get_business_locationsorting
        try {
            const {main_category_id}  = req.body//'4';
            var query = `select * from sub_category where sub_category_id in (select sub_category_id from main_sub_categories where main_category_id='`+main_category_id+`');`
            console.log(query);
            const createUser = await pool.query(query);
            res.json({"status": 1, "data": createUser.rows});  
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    router.post("/get_sub_categories", async(req, res) =>{//get_business_locationsorting
        try {
            const {main_category_id}  = req.body//'4';
            var query = `select * from sub_category where sub_category_id in (select sub_category_id from main_sub_categories where main_category_id='`+main_category_id+`');`
            console.log(query);
            const createUser = await pool.query(query);
            res.json({"status": 1, "data": createUser.rows});  
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    router.post("/get_location", async(req, res) =>{//get_location
        try {
            const {business_id}  = req.body//'4';
            var query = `select latitude,longitude  from location l,(select business_id,location_id from location_business where business_id='`+business_id+`') lb where l.location_id=lb.location_id;`
            console.log(query);
            const createUser = await pool.query(query);
            res.json({"status": 1, "data": createUser.rows});  
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    router.post("/get_business_withkeyword", async(req, res) =>{//get_location
        try {
            const {keyword}  = req.body//'name1';
            var query = `select * from business b,(select business_id from keyword where name='`+keyword+`') k where b.business_id=k.business_id;`
            console.log(query);
            const createUser = await pool.query(query);
            res.json({"status": 1, "data": createUser.rows});  
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    router.post("/push_notification", async(req, res) =>{//get_location

        try {

                var query = `SELECT user_token FROM users where is_active='true'`;
                console.log(query);
                const createUser = await pool.query(query);
                var list = [];
                for(var i = 0; i < createUser.rows.length; i++){
                    list.push(createUser.rows[i]["user_token"]);
                }
                // res.json({"status": 1, "data": createUser.rows});
            var body = {
                "registration_ids" : list,
                "notification" : {
                    "body" : "Body of Your Notification",
                    "title": "Title of Your Notification",
                   "sound": "default"
                },
                "data" : {
                    "body" : "https://fcm.googleapis.com/fcm/send",
                    "title": "Title of Your Notification",
                    "message": "Body of Your Notification",
                   "sound": "default"
                },
               "priority": "high"
            }
            request({
                url: "https://fcm.googleapis.com/fcm/send",
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'key = AAAAUbKPSFA:APA91bF3l5wTxOD6MT0d7n-3LoCgPMemIZI6rWzX9XiC0i3SQE3ARD4Q4auEiljwQfQZeRJz6JGw5PoE_G9lBV1rTbwBem-wHdHwuu-dCYFeJ4u-1CCZH-vxs-OtgiuyQMfzGrNfCx-N',
                },
                body: JSON.stringify(body)
            }, function (error, response, body){
                
                res.json({"status": 1, "data": list});  
            });
        } catch(err) {
            res.json({"status": 0, "data": []});  
        }
    });
        router.post("/get_10business_location", async(req, res) =>{//get_location
        try {
            const {latitude , longitude}  = req.body//'2';
            // const latitude ='25.333333333333333'
            // const longitude = '51.3333333333333'
            // var query = `select business_id,image_url,business_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,rating business_rating from business_image bi ,(select name business_name,business_id bb_id,rating from business as b ,(select business_id b_id,distance from location_business as lb ,(select * from ( SELECT  location_id l_id ,name lname,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 700000 ORDER BY distance desc ) as s where lb.location_id=s.l_id) as sb where b.business_id=sb.b_id order by distance limit 10) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id;`
            var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM business ) al where distance < 700000 ORDER BY distance desc ) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id);`
            console.log(query);
            const existrating = await pool.query(query);
            console.log(existrating.rows[0].exists);
            if(existrating.rows[0].exists)
            {
                var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM business ) al where distance < 700000 ORDER BY distance desc ) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id`
                const existrating2=await pool.query(query2);
                res.json({"status": 1, "data": existrating2.rows}); 
            }
                // res.json({"status": 1, "data": existrating.rows});  
            else{
                var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM business ) al where distance < 700000 ORDER BY distance desc ) as b3 where bi.business_id=b3.bb_id;`
                const notexistrating=await pool.query(query2);
                res.json({"status": 1, "data": notexistrating.rows}); 
            }
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    router.post("/get_10business_withuserid", async(req, res) =>{//get_location
        try {
            // const {latitude , longitude}  = req.body//'2';
            // const latitude ='25.333333333333333'
            // const longitude = '51.3333333333333'
            const users_id=req.body
            // var query = `select business_id,image_url,business_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,rating business_rating from business_image bi ,(select name business_name,business_id bb_id,rating from business as b ,(select business_id b_id,distance from location_business as lb ,(select * from ( SELECT  location_id l_id ,name lname,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 700000 ORDER BY distance desc ) as s where lb.location_id=s.l_id) as sb where b.business_id=sb.b_id order by distance limit 10) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id;`
            var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating from business_image bi ,(select  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating  FROM business b ,(select business_id f_bid from favorites where users_id=`+users_id+`) as f where b.business_id=f.f_bid)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id);`
            console.log(query);
            const existrating = await pool.query(query);
            console.log(existrating.rows[0].exists);
            if(existrating.rows[0].exists)
            {
                var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating from business_image bi ,(select  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating  FROM business b ,(select business_id f_bid from favorites where users_id=`+users_id+`) as f where b.business_id=f.f_bid)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id;`
                const existrating2=await pool.query(query2);
                res.json({"status": 1, "data": existrating2.rows}); 
            }
                // res.json({"status": 1, "data": existrating.rows});  
            else{
                var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating from business_image bi ,(select  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating  FROM business b ,(select business_id f_bid from favorites where users_id=`+users_id+`) as f where b.business_id=f.f_bid)  as b3 where bi.business_id=b3.bb_id`
                const notexistrating=await pool.query(query2);
                res.json({"status": 1, "data": notexistrating.rows}); 
            }
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    router.post("/add_favorites", async(req, res) =>{
        try {
            // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
            // console.log(query);
            var number='3'
            var start=new Date().toISOString();
            const { users_id , business_id} =req.body
            // const users_id ='1'
            // const business_id ='1'
    
            const createUser = await pool.query(
                `INSERT INTO favorites (users_id,business_id, created_at, updated_at ) VALUES ( $1, $2, $3, $4) RETURNING *`,
                [users_id,business_id,start,start]
                // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
            );
            res.json({"status": 1,"data":createUser.rows[0]});  
        } catch (err) {
            res.json({"status": 0});  
            console.error(err.message);
        }
    });
    router.post("/delete_favorites", async(req, res) =>{
        try {
            const favorites_id ='2'
    
            const createUser = await pool.query(
                `delete from favorites where favorites_id=`+favorites_id+``
            );
            res.json({"status": 1,"data":[]});  
        } catch (err) {
            res.json({"status": 0});  
            console.error(err.message);
        }
    });
    router.post("/get_10business_sort", async(req, res) =>{//get_location
        try {
            // const {latitude , longitude}  = req.body//'2';
            // const latitude ='25.333333333333333'
            // const longitude = '51.3333333333333'
            // const users_id=req.body

            const main_category_id ='2'
            const sort = 'alphabetic'
            const sub_category_id = 'all'
            const location_id = 'all'
            const latitude ='23.22222222222'
            const longitude ='51.888888888888'

            // var query = `select business_id,image_url,business_name,rating,business_rating from rating r, (select business_id bi_business_id,image_url,business_name,rating business_rating from business_image bi ,(select name business_name,business_id bb_id,rating from business as b ,(select business_id b_id,distance from location_business as lb ,(select * from ( SELECT  location_id l_id ,name lname,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 700000 ORDER BY distance desc ) as s where lb.location_id=s.l_id) as sb where b.business_id=sb.b_id order by distance limit 10) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id;`
            var sortedbusiness
            if(sort=='alphabetic' && sub_category_id=='all' && location_id == 'all'){
                sortedbusiness = await getallsortedbusiness(main_category_id)
            }
            else if(sort=='rating' && sub_category_id=='all' && location_id == 'all')
            {
                sortedbusiness = await getallratingsortedbusiness(main_category_id)
                
            }
            else if(sort=='location' && sub_category_id=='all' && location_id == 'all')
            {
                sortedbusiness = await getalllocationsortedbusiness(main_category_id,latitude,longitude)
            }
            else if(sort=='alphabetic' && sub_category_id!=='all' && location_id == 'all')
            {
                sortedbusiness = await getallsubcategoryalphabetsortfilterbusiness(sub_category_id)
            }
            else if(sort=='rating' && sub_category_id!=='all' && location_id == 'all')
            {
                sortedbusiness = await getallsubcategoryratingsortfilterbusiness(sub_category_id)
            }
            else if(sort=='location' && sub_category_id!=='all' && location_id == 'all')
            {
                sortedbusiness = await getallsubcategoryfilterlocationsortedbusiness(sub_category_id,latitude,longitude)
            }
            // var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id='2') mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc;);`
            // console.log(query);
            // const existrating = await pool.query(query);
            // console.log(existrating.rows[0].exists);
            // if(existrating.rows[0].exists)
            // {
            //     var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id='2') mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc;`
            //     const existrating2=await pool.query(query2);
            //     res.json({"status": 1, "data": existrating2.rows}); 
            // }
            // else{
            //     var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id='2') mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id`
            //     const notexistrating=await pool.query(query2);
            //     res.json({"status": 1, "data": notexistrating.rows}); 
            // }
                res.json({"status": 1, "data": await sortedbusiness.rows}); 
            
        } catch (err) {
            res.json({"status": 0, "data": []});  
            console.error(err.message);
        }
    });
    async function getallsortedbusiness(main_category_id){
            var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc);`

        console.log(query);
        const existrating = await pool.query(query);
        console.log(existrating.rows[0].exists);
        if(existrating.rows[0].exists)
        {
            var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc;`
            const existrating2=await pool.query(query2);
            return existrating2

            // res.json({"status": 1, "data": existrating2.rows}); 
        }
        else{
            var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id`
            const notexistrating=await pool.query(query2);
            return notexistrating
            // res.json({"status": 1, "data": notexistrating.rows}); 
        }
    }
    async function getallratingsortedbusiness(main_category_id){
        var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc);`
        console.log(query);
        const existrating = await pool.query(query);
        console.log(existrating.rows[0].exists);
        if(existrating.rows[0].exists)
        {
            var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by rating desc;`
            const existrating2=await pool.query(query2);
            return existrating2

            // res.json({"status": 1, "data": existrating2.rows}); 
        }
        else{
            var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id order by business_rating desc`
            const notexistrating=await pool.query(query2);
            return notexistrating
            // res.json({"status": 1, "data": notexistrating.rows}); 
        }
    }
    async function getalllocationsortedbusiness(main_category_id,latitude,longitude){
        var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude,distance from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude,distance from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,phone_number,latitude,longitude,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id ) al where distance < 700000 ) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by distance asc);`
        console.log(query);
        const existrating = await pool.query(query);
        console.log(existrating.rows[0].exists);
        if(existrating.rows[0].exists)
        {
            var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude,distance from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude,distance from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,phone_number,latitude,longitude,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id ) al where distance < 700000 ) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by distance asc;`
            const existrating2=await pool.query(query2);
            return existrating2

            // res.json({"status": 1, "data": existrating2.rows}); 
        }
        else{
            var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude,distance from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,phone_number,latitude,longitude,( 3959 * acos( cos( radians(`+latitude+`) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(`+longitude+`) ) + sin( radians(`+latitude+`) ) * sin( radians( latitude ) ) ) ) AS distance  from business b ,( select business_id b_id,mc_sub_id ,sub_category_id from sub_categories_business scb, ( select sub_category_id mc_sub_id from main_sub_categories msc,(select main_category_id main_category_id1 from main_category where main_category_id=`+main_category_id+`) mc where msc.main_category_id=mc.main_category_id1) ms where scb.sub_category_id=ms.mc_sub_id) m where b.business_id=m.b_id ) al where distance < 700000 ) as b3 where bi.business_id=b3.bb_id order by distance asc`
            const notexistrating=await pool.query(query2);
            return notexistrating
            // res.json({"status": 1, "data": notexistrating.rows}); 
        }
    }
    async function getallsubcategoryalphabetsortfilterbusiness(sub_category_id){
        var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id ,sub_category_id from sub_categories_business  where  sub_category_id=`+sub_category_id+` ) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc);`

        console.log(query);
        const existrating = await pool.query(query);
        console.log(existrating.rows[0].exists);
        if(existrating.rows[0].exists)
        {
            var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id ,sub_category_id from sub_categories_business  where  sub_category_id=`+sub_category_id+` ) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by business_name asc;`
            const existrating2=await pool.query(query2);
            return existrating2

            // res.json({"status": 1, "data": existrating2.rows}); 
        }
        else{
            var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id ,sub_category_id from sub_categories_business  where  sub_category_id=`+sub_category_id+` ) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id order by business_name asc ;`
            const notexistrating=await pool.query(query2);
            return notexistrating
            // res.json({"status": 1, "data": notexistrating.rows}); 
        }
    }
    async function getallsubcategoryratingsortfilterbusiness(sub_category_id){
        var query =`select exists (select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id ,sub_category_id from sub_categories_business  where  sub_category_id=`+sub_category_id+` ) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by rating desc);`

        console.log(query);
        const existrating = await pool.query(query);
        console.log(existrating.rows[0].exists);
        if(existrating.rows[0].exists)
        {
            var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id ,sub_category_id from sub_categories_business  where  sub_category_id=`+sub_category_id+` ) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by rating desc;`
            const existrating2=await pool.query(query2);
            return existrating2

            // res.json({"status": 1, "data": existrating2.rows}); 
        }
        else{
            var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude from business_image bi ,(select business_id bb_id ,name business_name,arabic_name arabic_business_name ,sub_name,arabic_sub_name,b_id,rating,phone_number,latitude,longitude from business b ,( select business_id b_id ,sub_category_id from sub_categories_business  where  sub_category_id=`+sub_category_id+` ) m where b.business_id=m.b_id)  as b3 where bi.business_id=b3.bb_id order by business_rating desc ;`
            const notexistrating=await pool.query(query2);
            return notexistrating
            // res.json({"status": 1, "data": notexistrating.rows}); 
        }
    }
    async function getallsubcategoryfilterlocationsortedbusiness(main_category_id,latitude,longitude){
        var query =`select exists ( select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude,distance from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude,distance from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,phone_number,latitude,longitude,( 3959 * acos( cos( radians(23.4444) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(51.7777) ) + sin( radians(23.4444) ) * sin( radians( latitude ) ) ) ) AS distance  from business b ,( select business_id b_id,sub_category_id from sub_categories_business  where  sub_category_id='2' ) m where b.business_id=m.b_id ) al where distance < 700000 ) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by distance asc);`
        console.log(query);
        const existrating = await pool.query(query);
        console.log(existrating.rows[0].exists);
        if(existrating.rows[0].exists)
        {
            var query2=`select business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating,business_rating,phone_number,latitude,longitude,distance from rating r, (select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude,distance from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,phone_number,latitude,longitude,( 3959 * acos( cos( radians(23.4444) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(51.7777) ) + sin( radians(23.4444) ) * sin( radians( latitude ) ) ) ) AS distance  from business b ,( select business_id b_id,sub_category_id from sub_categories_business  where  sub_category_id='2' ) m where b.business_id=m.b_id ) al where distance < 700000 ) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id order by distance asc;`
            const existrating2=await pool.query(query2);
            return existrating2

            // res.json({"status": 1, "data": existrating2.rows}); 
        }
        else{
            var query2=`select business_id bi_business_id,image_url,business_name,arabic_business_name,sub_name,arabic_sub_name,rating business_rating,phone_number,latitude,longitude,distance from business_image bi ,(select * from ( SELECT  business_id bb_id,name business_name,arabic_name arabic_business_name,sub_name,arabic_sub_name,rating,phone_number,latitude,longitude,( 3959 * acos( cos( radians(23.4444) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(51.7777) ) + sin( radians(23.4444) ) * sin( radians( latitude ) ) ) ) AS distance  from business b ,( select business_id b_id,sub_category_id from sub_categories_business  where  sub_category_id='2' ) m where b.business_id=m.b_id ) al where distance < 700000 ) as b3 where bi.business_id=b3.bb_id order by distance asc`
            const notexistrating=await pool.query(query2);
            return notexistrating
            // res.json({"status": 1, "data": notexistrating.rows}); 
        }
    }
//     router.post("/get_business_withkeyword", async(req, res) =>{//get_location
//         try {
//             const {user_id}  = req.body//'2';
//             var query = `select * from alert where users_id='`+user_id+`'`
//             console.log(query);
//             const createUser = await pool.query(query);
//             res.json({"status": 1, "data": createUser.rows});  
//         } catch (err) {
//             res.json({"status": 0, "data": []});  
//             console.error(err.message);
//         }
//     });



// select business_id,image_url,business_name,rating from business_image bi ,(select name business_name,business_id bb_id,rating from business as b ,(select business_id b_id,distance from location_business as lb ,(select * from ( SELECT  location_id l_id ,name lname,( 3959 * acos( cos( radians(2.44445) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(5.222223) ) + sin( radians(2.44445) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 700 ORDER BY distance desc ) as s where lb.location_id=s.l_id) as sb where b.business_id=sb.b_id order by distance limit 3) as b3 where bi.business_id=b3.bb_id;
// select business_id,image_url,business_name,rating from rating r, (select business_id bi_business_id,image_url,business_name,rating business_rating from business_image bi ,(select name business_name,business_id bb_id,rating from business as b ,(select business_id b_id,distance from location_business as lb ,(select * from ( SELECT  location_id l_id ,name lname,( 3959 * acos( cos( radians(2.44445) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(5.222223) ) + sin( radians(2.44445) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 700 ORDER BY distance desc ) as s where lb.location_id=s.l_id) as sb where b.business_id=sb.b_id order by distance limit 3) as b3 where bi.business_id=b3.bb_id) bimage where r.business_id=bimage.bi_business_id;
module.exports = router;
