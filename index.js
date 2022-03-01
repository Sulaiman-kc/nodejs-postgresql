const express = require("express");
const app = express();


app.use(express.json()); // => req.body



const apiRoute = require("./routes/api");
const categoryRoute = require("./routes/category");
const createTableRoute = require("./routes/create_table");



app.use("/api", apiRoute);
app.use("/api", categoryRoute);
app.use("/create_table", createTableRoute);


const port = 3000;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});