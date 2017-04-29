'use strict'

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const junk = require('junk');
let app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));
app.use(express.static('./app/**'));
app.use(express.static('./app/**/**'));


app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    //res.header("Content-Type", "multipart/form-data");
    //res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




// define file name and destination to save
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/images')
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        cb(null, 'uploads-' + Date.now() + '.' + ext);
    }
});



// define what file type to accept
let filter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb('Failed: format not supported');
    }
}

// set multer config
let upload = multer({
    storage: storage,
    fileFilter: filter
}).single('upload');


/* ===============================
  ROUTE
 ============================== */

// route for file upload

app.post('/uploads', (req, res) => {
    console.log('log!!!', req)

    upload(req, res, (err) => {
        if (err) {
            return res.end("Error uploading file.");
        }

        res.status(200).json({
            file: req.protocol + '://' + req.get('host') + '/images/' + req
        })
        console.log('file uploaded!', req)
    });


})

app.get('/images', (req, res) => {
    let file_path = req.protocol + '://' + req.get('host') + '/images/';
    let files = fs.readdirSync('./images/');
    files = files
        .filter(junk.not) // remove .DS_STORE etc
        .map(f => file_path + f); // map with url path
    res.json(files);
});

// general route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
})

var server = app.listen(8000, _ => {
    console.log('server started. listening to 8000');
})