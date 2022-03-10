const express = require("express");
var bodyParser = require('body-parser')
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json()); // => req.body



const apiRoute = require("./routes/api");
const categoryRoute = require("./routes/category");
const createTableRoute = require("./routes/create_table");
const mobileAppRoute = require("./routes/mobileapp");




app.use("/api", apiRoute);
app.use("/category", categoryRoute);
app.use("/create_table", createTableRoute);
app.use("/mobileapp", mobileAppRoute);


const port = 3000;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});