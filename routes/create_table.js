const express = require("express");
const router = express.Router();
const pool = require("../db");
//knex
router.get("/", async(req, res) =>{
    const text = [
    // `CREATE TABLE IF NOT EXISTS "roles" (
	//     "id" SERIAL,
	//     "name" VARCHAR(100),
	//     "role" VARCHAR(100),
	//     "guard_name" VARCHAR(100),
	//     "created_at" TIMESTAMP,
	//     "updated_at" TIMESTAMP,
	//     PRIMARY KEY ("id")
    // );`,
    `CREATE TABLE IF NOT EXISTS "users" (
	    "users_id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "email" VARCHAR(100),
	    "user_token" VARCHAR(200),
	    "phone_number" VARCHAR(100) NOT NULL,
	    "address" VARCHAR(200),
	    "latitude" double precision ,
	    "longitude" double precision ,
	    "avatar" VARCHAR(100),
	    "user_ip" VARCHAR(100),
	    "image_url" TEXT,
	    "notification_status" INT DEFAULT 0,
	    "otp" INT,
	    "role" INT DEFAULT 1,
	    "gender" VARCHAR(100),
	    "dob" DATE,
	    "is_active" BOOLEAN DEFAULT true,
		"is_admin" BOOLEAN DEFAULT false,
		"password" VARCHAR(100),
		"language" VARCHAR(100),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("users_id")
    );`,
    `CREATE TABLE IF NOT EXISTS "main_category" (
	    "main_category_id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "arabic_name" VARCHAR(100) NOT NULL,
        "is_active" BOOLEAN DEFAULT true,
	    "image_url" TEXT,
        "order_column" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("main_category_id")
    );`,
    `CREATE TABLE IF NOT EXISTS "sub_category" (
	    "sub_category_id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "arabic_name" VARCHAR(100) NOT NULL,
        "is_active" BOOLEAN DEFAULT true,
	    "image_url" TEXT,
        "order_column" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("sub_category_id")
    );`,
    `CREATE TABLE IF NOT EXISTS "main_sub_categories" (
	    "main_sub_categories_id" TEXT,
	    "main_category_id" INT NOT NULL,
	    "sub_category_id" INT NOT NULL,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("main_sub_categories_id"),
		FOREIGN KEY (main_category_id) REFERENCES main_category (main_category_id),
		FOREIGN KEY (sub_category_id) REFERENCES sub_category (sub_category_id)
    );`,
    `CREATE TABLE IF NOT EXISTS "business" (
	    "business_id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "arabic_name" VARCHAR(100) NOT NULL,
        "is_active" BOOLEAN DEFAULT true,
	    "sub_name" VARCHAR(100),
	    "arabic_sub_name" VARCHAR(100),
	    "description" TEXT,
	    "arabic_description" TEXT,
        "address" VARCHAR(200),
	    "latitude" double precision,
	    "longitude" double precision,
        "phone_number" VARCHAR(100),
        "alt_phone_number" VARCHAR(100),
	    "email" VARCHAR(100),
	    "slug" VARCHAR(100),
	    "rating" VARCHAR(10),
	    "web" VARCHAR(100),
	    "social_media" VARCHAR(200),
		"timing" VARCHAR(200),
		"service_name" JSONB,
		"arabic_service_name" JSONB,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("business_id")
    );`,
    `CREATE TABLE IF NOT EXISTS "sub_categories_business" (
	    "sub_categories_business_id" TEXT,
	    "sub_category_id" INT,
	    "business_id" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("sub_categories_business_id"),
		FOREIGN KEY (sub_category_id) REFERENCES sub_category (sub_category_id),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
    `CREATE TABLE IF NOT EXISTS "rating" (
	    "rating_id" SERIAL,
	    "users_id" INT,
	    "business_id" INT,
	    "rating" VARCHAR(10),
	    "comments" JSONB,
	    "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("rating_id"),
		FOREIGN KEY (users_id) REFERENCES users (users_id),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
    `CREATE TABLE IF NOT EXISTS "pages" (
	    "pages_id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "slug" VARCHAR(100),
	    "body" TEXT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("pages_id")
    );`,
    // `CREATE TABLE IF NOT EXISTS "services" (
	//     "services_id" SERIAL,
	//     "name" VARCHAR(100) NOT NULL,
    //     "is_active" BOOLEAN DEFAULT true,
    //     "created_at" TIMESTAMP,
	//     "updated_at" TIMESTAMP,
	//     PRIMARY KEY ("services_id")
    // );`,
    `CREATE TABLE IF NOT EXISTS "business_enquiries" (
	    "business_enquiries_id" SERIAL,
	    "name" VARCHAR(100),
		"business_name" VARCHAR(100),
	    "type" VARCHAR(100),
	    "email" VARCHAR(100),
	    "phone_number" VARCHAR(100),
        "is_active" BOOLEAN DEFAULT true,
	    "sub_category" VARCHAR(100),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
        PRIMARY KEY ("business_enquiries_id")
    );`, `CREATE TABLE IF NOT EXISTS "keyword" (
	    "keyword_id" SERIAL,
		"business_id" INT,
	    "name" VARCHAR(100),
	    "key" VARCHAR(100),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
        PRIMARY KEY ("keyword_id"),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
    `CREATE TABLE IF NOT EXISTS "alert" (
	    "alert_id" TEXT,
        "data" TEXT,
	    "users_id" INT,
        "is_read" INT DEFAULT 0,
        "type" INT DEFAULT 1,
	    "image_url" TEXT,
	    "url" VARCHAR(150),
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("alert_id"),
		FOREIGN KEY (users_id) REFERENCES users (users_id)
    );`,
    `CREATE TABLE IF NOT EXISTS "favorites" (
	    "favorites_id" SERIAL,
        "users_id" INT,
        "business_id" INT,
        "type" INT DEFAULT 1,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("favorites_id"),
		FOREIGN KEY (users_id) REFERENCES users (users_id),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
    `CREATE TABLE IF NOT EXISTS "business_image" (
	    "business_image_id" TEXT,
        "business_id" INT,
        "type" INT DEFAULT 1,
        "image_url" TEXT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("business_image_id"),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
	`CREATE TABLE IF NOT EXISTS "hits" (
	    "hits_id" SERIAL,
        "business_id" INT,
        "hits_count" INT DEFAULT 1,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("hits_id"),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
	`CREATE TABLE IF NOT EXISTS "search_hits" (
	    "search_hits_id" SERIAL,
        "business_id" INT,
        "hits_count" INT DEFAULT 1,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("search_hits_id"),
		FOREIGN KEY (business_id) REFERENCES business (business_id)
    );`,
	`CREATE TABLE IF NOT EXISTS "location" (
	    "location_id" SERIAL,
		"name" VARCHAR(100) NOT NULL,
	    "arabic_name" VARCHAR(100) NOT NULL,
		"latitude" double precision NOT NULL,
		"longitude" double precision NOT NULL,
        "is_active" BOOLEAN DEFAULT TRUE,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("location_id")
    );`,
	`CREATE TABLE IF NOT EXISTS "location_business" (
	    "location_business_id" SERIAL,
        "business_id" INT,
        "location_id" INT,
        "created_at" TIMESTAMP,
	    "updated_at" TIMESTAMP,
	    PRIMARY KEY ("location_business_id"),
		FOREIGN KEY (business_id) REFERENCES business (business_id),
		FOREIGN KEY (location_id) REFERENCES location (location_id)
    );`,
    ];
    for(var i in text){
        // console.log(text[i]);
        try {
            const createUser = await pool.query(text[i]);
        } 
		catch (err) {
            console.error(err.message);
        }
    }
    res.json({"status":"sucess"});
    
});

module.exports = router;
