const Cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const express = require('express');
const router = express.Router()
// const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
const moment = require('moment');

router.use(Cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(function timelog(req,resp,next){
    next();
})


const { Client } = require('pg');
const client1 = new Client({
    host: config.postgres.Db_host,
    port: config.postgres.Db_port,
    user: config.postgres.Db_user,
    password: config.postgres.Db_password,
    database: config.postgres.Db_dbname
  });

client1.connect()
module.exports = (req,res,next) => {
    //console.log(req)
    //console.log('******************')
    const token = req.headers['authorization'];
    const userUrl = req.headers['authorizedurl'];
    // decode token
    if (token)
    {
        // verifies secret and checks exp

        jwt.verify(token,config.secret_key,function(err,decoded){
            if(err)
            {
                console.log(err)
                return res.status(401).json('Token Expired');
            }
            else
            {
                var deco_token = jwt.decode(token);
                CreateNewToken(deco_token,res,next);
            }
        });
    }
    else
    {
        console.log('no present token')

        // if there is no token
        return res.status(403).json("No Token Provided");
    }
}
function CreateNewToken(deco_token,res,next)
{
    // let db = new sqlite3.Database('./users.db',(err)=>{
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     db.serialize(()=>{
            let sql = "SELECT * FROM users WHERE NAME='"+deco_token.data.name+"' AND USERS_ID = '"+deco_token.data.id+"' AND IS_ADMIN = "+deco_token.data.is_admin+"";
            //console.log(sql)
            client1.query(sql,[],(err,res1)=>{
                // console.log(res1.rows);
                row = res1.rows[0]
                // console.log(row);
                // console.log(deco_token.iat);
                // console.log(Number(row.last_login));
                if(err)
                {
                    console.log(err);
                }
                //console.log(row)(row == undefined) ? '1300' :
                if(row != undefined)
                {
                    const lastloginDB = Number(row.updated_at);
                    if(lastloginDB <= deco_token.iat)
                    {
                        let timeout =  row.session_timeout;
                        const signInOption = {
                            issuer : deco_token.issuer,
                            subject : deco_token.subject,
                            iat : lastloginDB,
                            exp : moment().valueOf() + parseInt(timeout)+3000000,
                            algorithm : config.algorithm,
                            data:{
                                name: deco_token.data.name,
                                users_id: deco_token.data.users_id,
                                is_admin: deco_token.data.is_admin,
                                config: (row.configupdate != null) ? true : false
                            }
                        }
                        const refresh_token = jwt.sign(signInOption,config.secret_key);
                        res.setHeader("Refresh_Token", refresh_token);
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.setHeader("Access-Control-Allow-Methods", "*");
                        res.setHeader("Access-Control-Expose-Headers","Refresh_Token")
                        next();
                    }
                    else
                    {
                        console.log(err)
                        return res.status(401).json('Already Login In Another System');
                    }
                }
                else
                {
                    console.log('user deleted issue occur and handled  ( row.LAST_LOGIN ::undefined');
                    return res.status(401).json('user deleted');
                } 
            })
            // db.get(sql,function(err,row){
            //     //console.log(row)
                            
            // })
        // })
    // })
}