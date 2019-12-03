var express = require("express");
var app = express();
var compression = require('compression')
app.use(compression())
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/uploads/");
    },
    filename: (req, file, cb) => {
        // cb(null,file.originalname) ;
        // console.log(file)
        let tail = file.originalname.split(".")[1];
        console.log(tail)
        let ran = Math.ceil(Math.random() * 1000 + 1);
        cb(null, ran + file.originalname);
    }
})
const upload = multer({storage: storage})
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/do-an", {useNewUrlParser: true});
app.use(express.static(__dirname));
app.use("/api", bodyParser.json());
let router = express.Router();
app.use("/api", router);

app.post("/api/file/upload", upload.single('imageFile'), (req, res) => {
    // console.log(req.file)
    if (req.file) {
        res.send({filePath: "/uploads/" + req.file.filename})
    }
})
require("../server-controllers/user-controller")(router)
require("../server-controllers/product-controller")(router)
require("../server-controllers/cart-controller")(router)
require("../server-controllers/trial-register-controllers")(router)
require("../server-controllers/payment-controller")(router)
require("../server-controllers/chart-controller")(router)
require("../server-controllers/inventory-controller")(router)
require("../server-controllers/view-controller")(router)
app.get("*", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});


var server = app.listen(process.env.PORT || 5001, function () {
    var port = server.address().port;

    console.log('Listening at http://localhost:%s', port);
});