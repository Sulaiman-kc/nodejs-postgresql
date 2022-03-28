const express = require("express");
const router = express.Router();
const pool = require("../db");
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
    // select * from alert where users_id='2';
    // get_business_withkeyword
    // select * from business b,(select business_id from keyword where name='name1') k where b.business_id=k.business_id;
    // select latitude,longitude  from location l,(select business_id,location_id from location_business where business_id='4') lb where l.location_id=lb.location_id;
    // select * from sub_category where sub_category_id in (select sub_category_id from main_sub_categories where main_category_id='4');

// select * from business b ,(select business_id,type from favorites where users_id='1') fwithid where b.business_id=fwithid.business_id;
// select bid,uname,latitude,longitude,rating,image_url from business_image bi,(select business_id bidfromr, bid,uname,latitude,longitude,rating from rating r ,(select bid,uname,latitude,longitude from location l,(select location_id lid,bid,uname  from location_business lb ,(select business_id bid ,name uname from business where business_id='2') b where lb.business_id=b.bid) bl where l.location_id=bl.lid) blfull where r.business_id=blfull.bid) blr where bi.business_id=blr.bid;

// select * from ( SELECT  *,( 3959 * acos( cos( radians(6.414478) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(12.466646) ) + sin( radians(6.414478) ) * sin( radians( latitude ) ) ) ) AS distance  FROM location ) al where distance < 5 ORDER BY distance LIMIT 20;
// SELECT id, ( 6371 * acos ( cos ( radians(27.2046° N) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($user_lng) ) + sin ( radians(27.2046° N) ) * sin( radians( lat ) ))) AS distanceFROM tableHAVING distance < 30ORDER BY distanceLIMIT 0 , 20;
//l | long// 27.2046° N | 77.4977° E
// select * from business as b join location_business as lb on b.business_id=lb.business_id; 
// select location_id from location where latitude='27.2046° N';
// select business_id from location_business as lb join location as l on lb.location_id=l.location_id where latitude='27.2046° N';


// select * from business where business_id in (select business_id from (select * from sub_categories_business as subb , (select * from sub_category where name='subs1') as sub where subb.sub_category_id=sub.sub_category_id) as subbsub) ;

module.exports = router;
