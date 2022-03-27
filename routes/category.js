const express = require("express");
const router = express.Router();
// const app =express()
const pool = require("../db");
var multer = require('multer');
const config = require('../config.json');
var store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.imagestorelocation);
  },
  filename: (req, file, cb) => {
      console.log(req);
      console.log(file);
    cb(null, file.originalname)
  }
});
var cors = require('cors')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));
// middleware that is specific to this router
// app.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

// app.use(express.json()); 
router.use(cors());
router.use(function timelog(req, resp, next) {
  next();
})
var upload = multer({storage:store})
router.use(function timelog(req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  router.post('/file',upload.single('file'),function(req,res){
    // console.log(req.body);
      const file=req.file
      console.log(file);
      if(!file){
        const error =new Error("please upload file")
        error.httpStatusCode =400
        // return next(error)
        res.json({status:"not success"})
        //,serverpath:config.fileurlpath
      }
      else{
        console.log("succesfull file upload");
        res.json({status:"success",serverpath:config.imageurlpath})
      }
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
router.post("/active_users", async(req, res) =>{
    try {
        console.log("body: %j", req.body)
        // console.log(JSON.parse(req.body));
        const { users_id , is_active  } = req.body;
        var start=new Date().toISOString();
        var query = `UPDATE users SET is_active = $1, updated_at = $2 WHERE users_id = $3 RETURNING *`;
        const createUser = await pool.query(query,
            [is_active, start, users_id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    }
    catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/add_main_category", async(req, res) =>{
    try {
        console.log(req.body);
        console.log(JSON.parse(req.body.data));
        console.log(JSON.parse(req.body.sub_categories_id));
        var sub_categories_id = JSON.parse(req.body.sub_categories_id)
        const { name, arabic_name , image_url , order_column ,  is_active  } = JSON.parse(req.body.data);
        var start=new Date().toISOString();
        const createUser = await pool.query(
            "INSERT INTO main_category (name,arabic_name, image_url, order_column, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *",
            [name,arabic_name, image_url, order_column,is_active, start, start]
        );
        const main_category_id = createUser.rows[0].main_category_id
        var array=[]
        sub_categories_id.forEach(element => {
            let json={}
            json['main_sub_categories_id'] =Math.random().toString(36).substr(2, 9);
            json['main_category_id'] = main_category_id
            json['sub_category_id'] = element.sub_category_id
            json['created_at'] = start
            json['updated_at'] = start
            array.push(json)
        });

    console.log(array);
   let createUser2 = await pool.query(
                `INSERT INTO main_sub_categories
                SELECT * FROM json_populate_recordset (NULL::main_sub_categories,
                  $1)`,
                [JSON.stringify(array)]
            );
            console.log("createUser2");
console.log(createUser2);
        console.log("successfully added :"+JSON.stringify(createUser.rows[0]));
        res.json({"status": 1, "data": createUser2.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/edit_main_category", async(req, res) =>{
    try {
        console.log(JSON.parse(req.body.data));
        const { name,arabic_name, image_url, order_column, is_active, main_category_id } = JSON.parse(req.body.data);
        var start=new Date().toISOString();
        var query = `UPDATE main_category SET name = $1,arabic_name=$2 ,image_url = $3, order_column = $4, is_active = $5, updated_at = $6 WHERE main_category_id = $7 RETURNING *`;
        const createUser = await pool.query(query,
            [name,arabic_name, image_url, order_column,is_active, start, main_category_id]
        );
        console.log("successfully added :"+JSON.stringify(createUser.rows[0]));
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err);
    }
});


router.post("/active_main_category", async(req, res) =>{
    try {
        console.log(req.body);
        const { is_active, main_category_id } = req.body
        var start=new Date().toISOString();
        var query = `UPDATE main_category SET is_active = $1, updated_at = $2 WHERE main_category_id = $3 RETURNING *`;
        const createUser = await pool.query(query,
            [is_active, start, main_category_id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    }
    catch (err) {
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
        const { name, arabic_name , image_url, order_column, is_active } = JSON.parse(req.body.data);
        var start=new Date().toISOString();
     
        const createUser = await pool.query(
            "INSERT INTO sub_category (name,arabic_name, image_url, order_column, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *",
            [name, arabic_name , image_url, order_column,is_active, start, start]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/edit_sub_category", async(req, res) =>{
    try {
        const { name,arabic_name , image_url, order_column, is_active, sub_category_id } = JSON.parse(req.body.data);
        var start=new Date().toISOString();
        var query = `UPDATE sub_category SET name = $1,arabic_name = $2, image_url = $3, order_column = $4, is_active = $5, updated_at = $6 WHERE sub_category_id = $7 RETURNING *`;
        const createUser = await pool.query(query,
            [name,arabic_name , image_url, order_column,is_active, start, sub_category_id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});


router.post("/active_sub_category", async(req, res) =>{
    try {
        console.log(req.body);
        const { is_active, sub_category_id } = req.body
        var start=new Date().toISOString();
        var query = `UPDATE sub_category SET is_active = $1, updated_at = $2 WHERE sub_category_id = $3 RETURNING *`;
        const createUser = await pool.query(query,
            [is_active, start, sub_category_id]
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

router.post("/get_sub_category_list", async(req, res) =>{//get_sub_category_list
    try {
        var query = `SELECT * FROM sub_category where is_active='true'`;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows.map((items)=>({
            ...items,value:false
        }))});  
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
router.post("/get_business", async(req, res) =>{//get_business
    try {
        var query = `SELECT * FROM business `;
        console.log(query);
        const createUser = await pool.query(query);
        res.json({"status": 1, "data": createUser.rows});  
    } catch (err) {
        res.json({"status": 0, "data": []});  
        console.error(err.message);
    }
});
router.post("/active_business", async(req, res) =>{
    try {
        console.log(req.body);
        const { is_active, business_id } = req.body
        var start=new Date().toISOString();
        var query = `UPDATE business SET is_active = $1, updated_at = $2 WHERE business_id = $3 RETURNING *`;
        const createUser = await pool.query(query,
            [is_active, start, business_id]
        );
        res.json({"status": 1, "data": createUser.rows[0]});  
    } catch (err) {
        res.json({"status": 0});  
        console.error(err.message);
    }
});
router.post("/add_business", async(req, res) =>{
    try {
        // var query = `DROP TABLE IF EXISTS users,main_category,sub_category,main_sub_categories,business,sub_categories_business,rating,pages,business_enquiries,alert,favorites,business_image,hits,search_hits,location,location_business`;
        // console.log(query);
        console.log(req.body);
        var sub_categories_id = JSON.parse(req.body.sub_categories_id)
        var images = JSON.parse(req.body.images)
        const { name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name ,mapingname ,arabic_mapingname } =JSON.parse(req.body.data);
        
        var start=new Date().toISOString();

        const createUser = await pool.query(
            `INSERT INTO business (name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name, created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *`,
            [name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description, address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   web, social_media, timing, service_name, arabic_service_name,start,start]
            // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
        );
        const business_id = createUser.rows[0].business_id
        await sub_categories_business(business_id,sub_categories_id,start)
        await savelocation(business_id,latitude,longitude,start,mapingname,arabic_mapingname)
        await saveimages(business_id,images,start)
        res.json({"status": 1});  
    } catch (err) {
        res.json({"status": 0});  
        console.log(err);
        console.error(err.message);
    }
});
async function sub_categories_business(business_id,sub_categories_id,start){
    // "sub_categories_business_id" SERIAL,
    // "sub_category_id" INT,
    // "business_id" INT,
    // const business_id = createUser.rows[0].main_category_id
        var array=[]
        sub_categories_id.forEach(element => {
            let json={}
            json['sub_categories_business_id'] =Math.random().toString(36).substr(2, 9);
            json['sub_category_id'] = element.sub_category_id
            json['business_id'] = business_id
            json['created_at'] = start
            json['updated_at'] = start
            array.push(json)
        });

    console.log(array);
   let createUser2 = await pool.query(
                `INSERT INTO sub_categories_business
                SELECT * FROM json_populate_recordset (NULL::sub_categories_business,
                  $1)`,
                [JSON.stringify(array)]
            );
            console.log("createUser2");
            console.log(createUser2);

}
async function savelocation(business_id,latitude,longitude,start,mapingname,arabic_mapingname)
{
  
  const is_active =true
    // console.log(array);
    const createUser2 = await pool.query(
        `INSERT INTO location (name, arabic_name, latitude, longitude, is_active,created_at, updated_at ) VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [mapingname, arabic_mapingname,  latitude, longitude,is_active,start,start]
        // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
    );
    const createUser3 = await pool.query(
        `INSERT INTO location_business ( business_id, location_id,created_at, updated_at ) VALUES ( $1, $2, $3, $4) RETURNING *`,
        [ business_id,  createUser2.location_id,start,start]
        // [name, email, token, phone, address, lat, long, user_ip, otp, gender, start, start]
    );
    console.log(createUser3);
//    let createUser2 = await pool.query(
//                 `INSERT INTO location
//                 SELECT * FROM json_populate_recordset (NULL::location,
//                   $1)`,
//                 [JSON.stringify(array)]
//             );
            console.log("createUser2");
console.log(createUser2);
}
async function saveimages(business_id,images,start)
{
    var array=[]
    images.forEach(element => {
        let json={}
        json['business_image_id'] =element.business_image_id

        // json['business_image_id'] =Math.random().toString(36).substr(2, 9);
        json['business_id'] = business_id
        json['type']=element.type
        json['image_url']=element.url
        json['created_at'] = start
        json['updated_at'] = start
        array.push(json)
    });

console.log(array);
let createUser3 = await pool.query(
            `INSERT INTO business_image
            SELECT * FROM json_populate_recordset (NULL::business_image,
              $1)`,
            [JSON.stringify(array)]
        );
        console.log("createUser3");
        console.log(createUser3);
}



module.exports = router;