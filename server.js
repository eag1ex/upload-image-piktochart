'use strict'

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const junk = require('junk');
let app = express();
var bodyParser = require('body-parser');
var port = app.set('port', process.env.PORT || 8000);
var ejs = require('ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));
app.use(express.static('./app/**'));
app.use(express.static('./app/**/**'));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './app');

app.use(function(req, res, next) {
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
    upload(req, res, (err) => {
        if (err) {
            return res.end("Error uploading file.");
        }

        res.status(200).json({
            file: req.protocol + '://' + req.get('host') + '/images/' + req
        })
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
    res.render('index', {
        /**
         * render server address VAR in index.html
         */
        API_MAIN: "http://localhost:" + app.get('port')
    });
})

var server = app.listen(app.get('port'), _ => {
    console.log('server started. listening on http://localhost:' + app.get('port'));
    console.log('Open Browser on http://localhost:' + app.get('port'));
})