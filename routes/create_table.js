const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async(req, res) =>{
    const text = [
    `CREATE TABLE IF NOT EXISTS "roles" (
	    "id" SERIAL,
	    "name" VARCHAR(100),
	    "role" VARCHAR(100),
	    "guard_name" VARCHAR(100),
	    "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "email" VARCHAR(100),
	    "user_token" VARCHAR(200),
	    "phone_number" VARCHAR(100) NOT NULL,
	    "address" VARCHAR(200),
	    "latitude" VARCHAR(100),
	    "longitude" VARCHAR(100),
	    "avatar" VARCHAR(100),
	    "user_ip" VARCHAR(100),
	    "image_url" VARCHAR(150),
	    "notification_status" INT DEFAULT 0,
	    "otp" INT,
	    "role" INT DEFAULT 1,
	    "gender" VARCHAR(100),
	    "dob" DATE,
	    "is_active" INT DEFAULT 1,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "main_category" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "is_active" INT DEFAULT 1,
	    "image_url" VARCHAR(150),
        "order_column" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "sub_category" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "is_active" INT DEFAULT 1,
	    "image_url" VARCHAR(150),
        "order_column" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "main_sub_categories" (
	    "id" SERIAL,
	    "main_category_id" INT,
	    "sub_category_id" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "business" (
	    "id" SERIAL,
	    "name" VARCHAR(100),
        "is_active" INT DEFAULT 1,
	    "sub_name" VARCHAR(100),
	    "description" TEXT,
        "address" VARCHAR(200),
	    "latitude" VARCHAR(100),
	    "longitude" VARCHAR(100),
        "phone_number" VARCHAR(100),
        "alt_phone_number" VARCHAR(100),
	    "email" VARCHAR(100),
	    "slug" VARCHAR(100),
	    "rating" VARCHAR(10),
	    "web" VARCHAR(100),
	    "social_media" VARCHAR(200),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "sub_categories_business" (
	    "id" SERIAL,
	    "main_category_id" INT,
	    "sub_category_id" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "rating" (
	    "id" SERIAL,
	    "user_id" INT,
	    "business_id" INT,
	    "rating" VARCHAR(10),
	    "comments" TEXT,
	    "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "pages" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "slug" VARCHAR(100),
	    "body" TEXT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "services" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "is_active" INT DEFAULT 1,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "business_enquiries" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "type" VARCHAR(100),
	    "email" VARCHAR(100),
	    "phone_number" VARCHAR(100),
        "is_active" INT DEFAULT 1,
	    "sub_category" VARCHAR(100),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
        PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "alert" (
	    "id" SERIAL,
        "data" TEXT,
	    "user_id" INT,
        "is_read" INT DEFAULT 1,
        "type" INT DEFAULT 1,
	    "image_url" VARCHAR(150),
	    "url" VARCHAR(150),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "favorites" (
	    "id" SERIAL,
        "user_id" INT,
        "business_id" INT,
        "type" INT DEFAULT 1,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`,
    `CREATE TABLE IF NOT EXISTS "business_image" (
	    "id" SERIAL,
        "business_id" INT,
        "type" INT DEFAULT 1,
        "image_url" VARCHAR(150),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("id")
    );`
    ];
    for(var i in text){
        // console.log(text[i]);
        try {
            const createUser = await pool.query(text[i]);
        } catch (err) {
            console.error(err.message);
        }
    }
    res.json({"status":"sucess"});
    
});

module.exports = router;