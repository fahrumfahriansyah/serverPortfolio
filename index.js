const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Auth = require("./src/Routes/authentication")
const Project = require("./src/Routes/project")
const mongoose = require('mongoose');
useragent = require('express-useragent');
//!setup user agent
app.use(useragent.express());
//! setup acces control
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Athorizatio');
    next();
}
app.use(allowCrossDomain)
//! tutup setup acces control
//!setup body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//! tutup setup body parser

app.use("/v1/Auth", Auth)
app.use("/v1/Project", Project)
//! set up mongoose
mongoose.set('strictQuery', true);

//! setUp error global
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message: message, data: data });

})
mongoose.connect("mongodb://fahri:fahri@ac-nmmxwym-shard-00-00.rpyjwwe.mongodb.net:27017,ac-nmmxwym-shard-00-01.rpyjwwe.mongodb.net:27017,ac-nmmxwym-shard-00-02.rpyjwwe.mongodb.net:27017/Portfolio?ssl=true&replicaSet=atlas-eow5ma-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => { console.log("mongoDB connectt") })
    .catch(() => console.log("MOngodb 404 not found"))
app.listen(4000, () => {
    console.log("open in broser port 4000")
})
