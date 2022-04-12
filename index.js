const express = require("express");
var bodyParser = require('body-parser')
const app = express();
var cors = require('cors')
app.use(cors());
// app.use(express.json()); // => req.body
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// var options = {
//     inflate: true,
//     limit: '100kb',
//     type: 'application/json'
// };
// app.use(bodyParser.raw(options));
app.use(express.json()); 


const apiRoute = require("./routes/api");
const categoryRoute = require("./routes/category");
const createTableRoute = require("./routes/create_table");
// const verify_token = require('./routes/tokenChecker');
// const mobileAppRoute = require("./routes/mobileapp");

// app.post('/',(req,res,next)=> {
//     console.log(req.body);
//     res.send("dfgdfg")
// })


// app.use('/v1/category/login_check',verify_token);
app.use("/v1/api", apiRoute);
app.use("/v1/category", categoryRoute);
app.use("/v1/create_table", createTableRoute);
// app.use("/mobileapp", mobileAppRoute);


const port = 3000;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});
