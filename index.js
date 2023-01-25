const express = require('express')
const app = express()
const mongoose = require('mongoose');
const multer = require('multer')
const path = require("path")
const bodyParser = require('body-parser')
const Auth = require("./src/Routes/authentication")
const Project = require("./src/Routes/project")
const Technology = require("./src/Routes/Technology")
useragent = require('express-useragent');
//! multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // mengarahakan destination ke file images
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        // agar nama file nya memiliki gettima dan di akahir ada original file
        cb(null, new Date().getTime() + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        // untuk mencari type nya
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"

    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"))
app.use("/images", express.static(path.join(__dirname, "images")))
//! tutup multer
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
app.use("/v1/Technology", Technology)
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
